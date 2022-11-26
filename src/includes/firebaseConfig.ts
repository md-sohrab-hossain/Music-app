import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

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
const storage = getStorage(app);

export {
  auth,
  database,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  storage,
  storageRef,
  getDownloadURL,
  uploadBytesResumable,
};
