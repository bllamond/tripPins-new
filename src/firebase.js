// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEaBXu1ccU4Cl2So9eboTqEENIk_nKgz4",
  authDomain: "trippins-new.firebaseapp.com",
  projectId: "trippins-new",
  storageBucket: "trippins-new.appspot.com",
  messagingSenderId: "672144168563",
  appId: "1:672144168563:web:c5d5e9702b7292a6ccbc06",
  measurementId: "G-PE2JFFP8JD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);