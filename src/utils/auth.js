import { ref, firebaseAuth } from './firebase'

export function logout() {
    
  return firebaseAuth().signOut()
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function loginOAuth() {
  const provider = new firebaseAuth.GithubAuthProvider();
  return firebaseAuth().signInWithPopup(provider);
}

export function createUser (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
}
