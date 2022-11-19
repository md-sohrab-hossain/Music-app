import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoU0SzZ2gRoNobxOFsw4SX-zqxvYTytJM",
  authDomain: "music-d2de5.firebaseapp.com",
  projectId: "music-d2de5",
  storageBucket: "music-d2de5.appspot.com",
  messagingSenderId: "1025140333655",
  appId: "1:1025140333655:web:1ea26385e281f874c71712",
};

//* Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

//* Initialize Realtime Database and get a reference to the service
const database = getFirestore(app);
const dbRef = collection(database, "users");

export {
  auth,
  dbRef,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
