'use client' // Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { isServer, QueryClient } from '@tanstack/react-query'
// idbPersister.ts
import { firebaseUI } from '@/lib/firebase'
import { FirebaseUIProvider } from '@firebase-oss/ui-react'
import {
  PersistQueryClientProvider,
  type PersistedClient,
  type Persister
} from '@tanstack/react-query-persist-client'
import { del, get, set } from 'idb-keyval'

export function createIDBPersister(key: IDBValidKey): Persister {
  return {
    async persistClient(client: PersistedClient) {
      await set(key, client)
    },
    async restoreClient() {
      return await get<PersistedClient>(key)
    },
    async removeClient() {
      await del(key)
    }
  }
}

const persister = createIDBPersister('reactQueryApp')

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 15 * 60 * 1000, // 15 minutes
        gcTime: 1000 * 60 * 60 * 24 // 24 hours
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  return (
    <FirebaseUIProvider ui={firebaseUI}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        {children}
      </PersistQueryClientProvider>
    </FirebaseUIProvider>
  )
}
