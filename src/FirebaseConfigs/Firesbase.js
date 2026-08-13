// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const API_KEY = process.env.REACT_APP_API_KEY
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN
const DATABASE_URL = process.env.REACT_APP_DATABASE_URL
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID
const STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET
const MESSAGING_SENDER_ID = process.env.REACT_APP_MESSAGING_SENDER_ID
const APP_ID = process.env.REACT_APP_APP_ID

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const database = getFirestore(app)
export const storage = getStorage(app)
export const realTimeDatabase = getDatabase(app)
