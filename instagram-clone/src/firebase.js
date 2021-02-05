import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyA3-s2-Q2CoeUT3CtK_xEZwm8TJfR9SPfY',
  authDomain: 'instagram-clone-50833.firebaseapp.com',
  projectId: 'instagram-clone-50833',
  storageBucket: 'instagram-clone-50833.appspot.com',
  messagingSenderId: '1029462516082',
  appId: '1:1029462516082:web:a97e3b52966637d1dbfdeb',
  measurementId: 'G-KH6E14FL7W',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
