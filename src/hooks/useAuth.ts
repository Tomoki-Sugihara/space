import { useMutation } from '@apollo/client'
import { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { CREATE_USER } from 'src/graphql/queries'
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

  const [createUser] = useMutation(CREATE_USER)
  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(googleProvider).then((userCredential) => {
      const { user } = userCredential
      if (user && userCredential.additionalUserInfo?.isNewUser) {
        createUser({ variables: { object: { id: user.uid, name: user.displayName } } })
      }
    })
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
