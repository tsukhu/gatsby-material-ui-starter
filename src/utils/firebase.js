// import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'

const config = {
  apiKey: `${process.env.GATSBY_FIREBASE_API_KEY}`,
  authDomain: `${process.env.GATSBY_FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `${process.env.GATSBY_FIREBASE_DATABASE_URL}`,
  projectId: `${process.env.GATSBY_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.GATSBY_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID}`
}

let ref, firebaseAuth, database

if (typeof window !== 'undefined') {
  const firebase = require('firebase/app')
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  database = firebase.database()
  ref = firebase.database().ref()
  firebaseAuth = firebase.auth
}

export { ref, firebaseAuth, database }
