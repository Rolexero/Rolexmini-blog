// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTfjV9dGS3zLrklBFfKnfeloBs2H6sKMQ",
    authDomain: "rolex-blog.firebaseapp.com",
    projectId: "rolex-blog",
    storageBucket: "rolex-blog.appspot.com",
    messagingSenderId: "541543442597",
    appId: "1:541543442597:web:a1a1631997dbb23c92454c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()