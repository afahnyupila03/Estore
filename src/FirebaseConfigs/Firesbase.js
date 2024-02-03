// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZwox48wFN3gVUdc2Blet19WRDtOlnh8w",
  authDomain: "timezone-2cf9b.firebaseapp.com",
  databaseURL:
    "https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "timezone-2cf9b",
  storageBucket: "timezone-2cf9b.appspot.com",
  messagingSenderId: "388467091931",
  appId: "1:388467091931:web:7ca16ba3ace416645b5ffe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
