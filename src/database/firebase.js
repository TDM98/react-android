import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCtCJvGgFeApVwK2SB0jv0XOO6tBmy2XBQ",
    authDomain: "reactnativefirebase-3e5f4.firebaseapp.com",
    projectId: "reactnativefirebase-3e5f4",
    storageBucket: "reactnativefirebase-3e5f4.appspot.com",
    messagingSenderId: "15693275897",
    appId: "1:15693275897:web:4cc9161f182408a5463828",
    measurementId: "G-E1E8E1VQV4"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;