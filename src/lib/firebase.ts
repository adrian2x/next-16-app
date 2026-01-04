'use client'
import { initializeUI } from '@firebase-oss/ui-core'
import { getApps, initializeApp } from 'firebase/app'
import { signOut as authSignOut, getAuth } from 'firebase/auth'

export const app =
  getApps().length === 0
    ? initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
        authDomain: 'gaccount-auth.firebaseapp.com',
        projectId: 'gaccount-auth',
        storageBucket: 'gaccount-auth.firebasestorage.app',
        messagingSenderId: '177242727609',
        appId: '1:177242727609:web:f4e8b51c29d8f7310da768',
        measurementId: 'G-3YN6R7XRHV'
      })
    : getApps()[0]

export const auth = getAuth(app)

export const signOut = () => authSignOut(auth)

export const firebaseUI = initializeUI({
  app
})
