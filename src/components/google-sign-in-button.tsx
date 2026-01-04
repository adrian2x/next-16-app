'use client'

import { getTranslation } from '@firebase-oss/ui-core'
import { GoogleLogo, useUI, type GoogleSignInButtonProps } from '@firebase-oss/ui-react'
import { GoogleAuthProvider } from 'firebase/auth'

import { OAuthButton } from '@/components/oauth-button'

export type { GoogleSignInButtonProps }

export function GoogleSignInButton({ provider, ...props }: GoogleSignInButtonProps) {
  const ui = useUI()

  return (
    <OAuthButton {...props} provider={provider || new GoogleAuthProvider()}>
      <GoogleLogo />
      <span>{getTranslation(ui, 'labels', 'signInWithGoogle')}</span>
    </OAuthButton>
  )
}
