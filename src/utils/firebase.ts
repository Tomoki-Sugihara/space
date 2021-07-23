import 'firebase/auth'
import 'firebase/firestore'

import firebase from 'firebase/app'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db }

// eslint-disable-next-line import/no-default-export
export default firebase
