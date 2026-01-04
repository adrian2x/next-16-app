'use client'
import { auth, signOut } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

export function useUser() {
  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log('onAuthStateChanged', user)
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  return { user, signOut }
}
