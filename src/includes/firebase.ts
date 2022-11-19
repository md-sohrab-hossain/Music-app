import { initializeApp } from "firebase/app";
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
  appId: "1:1025140333655:web:1ea26385e281f874c71712",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export const useCreateNewUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      return "Register Successful!";
    })
    .catch((error) => {
      return `Register Failed! ${error.message}`;
    });
};

export const useSignInUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      return "Login Successful!";
    })
    .catch((error) => {
      return `Login Failed! ${error.message}`;
    });
};
