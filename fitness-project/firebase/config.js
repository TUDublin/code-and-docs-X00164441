import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCPNA9AphcoHfSaU2u4DZq-3WjNlWjB0WE',
  authDomain: 'reactnativeapp-d66da.firebaseapp.com',
  databaseURL: 'https://reactnativeapp-d66da.firebaseio.com',
  projectId: 'reactnativeapp-d66da',
  storageBucket: 'reactnativeapp-d66da.appspot.com',
  messagingSenderId: '704419234253',
  appId: '1:704419234253:web:bbf74b3c755b302a41c484',
  measurementId: 'G-VTQF091SKH'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
