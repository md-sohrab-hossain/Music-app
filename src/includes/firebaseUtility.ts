import {
  auth,
  dbRef,
  addDoc,
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
export const useCreateNewUser = (data: userInfo) => addDoc(dbRef, data);

//**------------ Create new User  ------------------- */

//**  ---------- Authentication User ----------------*//
export const useRegisterUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const useSignInUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
//**  ---------- Authentication User ----------------*//
