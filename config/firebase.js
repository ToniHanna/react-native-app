import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth' //getAuth is the function to set the authentication inside the project
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAhR-R-t-RTMXpK8qran8UT1CONTbLTHKE",
  authDomain: "final-project-73027.firebaseapp.com",
  projectId: "final-project-73027",
  storageBucket: "final-project-73027.appspot.com",
  messagingSenderId: "827213847975",
  appId: "1:827213847975:web:17883dc04ba5f31f42ea82",
  measurementId: "G-BH41TDZYZ7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)

