import { doc, setDoc } from "firebase/firestore";
import {
  auth,
  database,
  storage,
  storageRef,
  uploadBytes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./firebaseConfig";

type userInfo = {
  age: string;
  name: string;
  email: string;
  country: string;
};

//**------------ Create new User  ------------------- */
export const useCreateNewUser = (data: userInfo, uid: string) => {
  const dbRef = doc(database, "users", uid);
  return setDoc(dbRef, data);
};

//**------------ Create new User  ------------------- */

//**  ---------- Authentication User ----------------*//
export const useRegisterUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const useSignInUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const useSignOutUser = () => {
  return auth.signOut();
};
//**  ---------- Authentication User ----------------*//

//** ------------ Upload File --------------------- *//
export const uploadFile = (file: File, fileName: string) => {
  const media = storageRef(storage, `sounds/${fileName}`);
  uploadBytes(media, file);
};
//** ------------ Upload File --------------------- *//
