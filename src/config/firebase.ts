import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDvimo4vYClUM0PJEM5M4vrZq4jTw6jL_8",
  authDomain: "neww-d3702.firebaseapp.com",
  projectId: "neww-d3702",
  storageBucket: "neww-d3702.firebasestorage.app",
  messagingSenderId: "491563870492",
  appId: "1:491563870492:web:2b37bbaf9729aae17eb2d9",
  measurementId: "G-BD10NHQMH4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
