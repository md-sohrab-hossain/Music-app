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
export const useCreateNewUser = async (data: userInfo) => {
  return await addDoc(dbRef, data)
    .then(() => {
      return "User Created successfully";
    })
    .catch((error) => {
      return error.message;
    });
};
//**------------ Create new User  ------------------- */

//**  ---------- Authentication User ----------------*//
export const useRegisterUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      return "Register Successful!";
    })
    .catch((error) => {
      return `Register Failed! ${error.message}`;
    });
};

export const useSignInUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      return "Login Successful!";
    })
    .catch((error) => {
      return `Login Failed! ${error.message}`;
    });
};
//**  ---------- Authentication User ----------------*//
