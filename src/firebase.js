import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD9gtQoPaQiiyZtquvqfocI_6Cib6RvNqY",
    authDomain: "insta-clone-1bd54.firebaseapp.com",
    projectId: "insta-clone-1bd54",
    storageBucket: "insta-clone-1bd54.appspot.com",
    messagingSenderId: "1095007252214",
    appId: "1:1095007252214:web:77fcc0a8e06f2fd1ac46d7"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const storage = firebase.storage()

const db = app.firestore()


export { auth,db,storage }