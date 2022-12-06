import {
  doc,
  setDoc,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  collection,
} from "firebase/firestore";

import {
  auth,
  database,
  storage,
  storageRef,
  deleteObject,
  uploadBytesResumable,
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

//** ------------ Upload File to firebase Storage --------------------- *//
export const uploadFile = (file: File, fileName: string) => {
  const media = storageRef(storage, `sounds/${fileName}`);
  return uploadBytesResumable(media, file);
};
//** ------------ Upload File to firebase Storage --------------------- *//

//** ------------ Delete File from firebase Storage --------------------- *//
export const deleteFile = async (fileName: string) => {
  const media = storageRef(storage, `sounds/${fileName}`);
  await deleteObject(media);
};
//** ------------ Delete File from firebase Storage --------------------- *//

//**------------ Save File to the database  ------------------- */
export const useSaveFile = async (data: any) => {
  try {
    await addDoc(collection(database, "songs"), data);
    return "Saved File";
  } catch (error) {
    console.log(error);
    return "Error on saved";
  }
};
//**------------ Save File to the database  ------------------- */

//** ------------ Delete File from firebase Database --------------------- *//
export const useDeleteSong = async (docId: string) => {
  await deleteDoc(doc(database, "songs", docId));
};
//** ------------ Delete File from firebase Database --------------------- *//

//**------------ Get song list from database  ------------------- */
export const useGetSongList = async () => {
  try {
    const data = query(
      collection(database, "songs"),
      where("uid", "==", auth.currentUser?.uid)
    );
    const songs = await getDocs(data);
    return songs.docs.map((doc) => {
      const songs = {
        ...doc.data(),
        docId: doc.id,
      };
      return songs;
    });
  } catch (error) {
    console.log(error);
  }
};
//**------------ Get song list from database  ------------------- */

//**------------ Update songs to the database  ------------------- */
export const useUpdateSongs = (song: Object, docId: string) => {
  try {
    const dbRef = doc(database, "songs", docId);
    return setDoc(dbRef, song);
  } catch (error) {
    console.log("error on update");
  }
};
//**------------ Update songs to the database  ------------------- */
