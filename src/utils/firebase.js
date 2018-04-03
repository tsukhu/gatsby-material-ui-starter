import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAq6L19T-JqS2g9VeprbLTeKkPDUMDfh8M',
  authDomain: 'challenges-tfg.firebaseapp.com',
  databaseURL: 'https://challenges-tfg.firebaseio.com',
  projectId: 'challenges-tfg',
  storageBucket: 'challenges-tfg.appspot.com',
  messagingSenderId: '833393608708'
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()

export const firebaseAuth = firebase.auth
