import { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { uidState } from 'src/state/userState'

import firebase, { auth } from '../utils/firebase'

export const useAuth = () => {
  const setUid = useSetRecoilState(uidState)
  const initializeUser = useCallback(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid)
      }
    })
    return () => unsubscribe()
  }, [setUid])

  useEffect(() => {
    return initializeUser()
  }, [initializeUser])

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithRedirect(googleProvider)
  }

  const signOut = async () => {
    await auth.signOut()
    setUid('')
  }

  return {
    signIn,
    signOut,
  }
}
