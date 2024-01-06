import {
  WhereFilterOp,
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserDetails } from "../models/UserDetails";

const userDetailsCollectionRef = collection(db, "userDetails");

async function getUserDetailsSnapshot(
  key: string,
  operator: WhereFilterOp,
  value: string
) {
  const queryTransaction = query(
    userDetailsCollectionRef,
    where(key, operator, value)
  );
  return await getDocs(queryTransaction);
}

export async function addUserDetails({
  userUID,
  userName,
  displayName,
  photoURL,
}: UserDetails) {
  await addDoc(userDetailsCollectionRef, {
    userUID,
    userName: userName.toLocaleUpperCase(),
    displayName,
    photoURL,
  });
}

export async function updateUserDetails({
  userUID,
  userName,
  photoURL,
}: UserDetails) {
  const userDetailsUpdate: { [key: string]: any } = {};
  if (userName.trim() !== "")
    userDetailsUpdate.userName = userName.trim().toUpperCase();

  if (photoURL?.trim() !== "") userDetailsUpdate.photoURL = photoURL?.trim();

  // if (displayName?.trim() !== "")
  //   userDetailsUpdate.displayName = displayName?.trim();

  const querySnapshot = await getUserDetailsSnapshot("userUID", "==", userUID);
  querySnapshot.forEach((doc) => {
    updateDoc(doc.ref, userDetailsUpdate);
  });
}

export async function getAllUsersDetailsByInput(value: string) {
  if (value === "") return null;
  const queryTransaction = query(
    userDetailsCollectionRef,
    where("userName", ">=", value.toLocaleUpperCase()),
    where("userName", "<=", value.toLocaleUpperCase() + "\uf8ff")
  );
  const querySnapshot = await getDocs(queryTransaction);
  let docs: UserDetails[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    docs.push({
      userUID: id,
      userName: data.userName,
      displayName: data.displayName,
      photoURL: data.photoURL,
    } as UserDetails);
  });
  return docs;
}

export async function getUserDetailsByUID(userUID: string) {
  const querySnapshot = await getUserDetailsSnapshot("userUID", "==", userUID);
  let docs: UserDetails[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    docs.push({
      userUID: data.userUID,
      userName: data.userName,
      displayName: data.displayName,
      photoURL: data.photoURL,
    } as UserDetails);
  });
  return docs[0];
}

export async function getUserDetailsByUserName(userName: string) {
  const querySnapshot = await getUserDetailsSnapshot(
    "userName",
    "==",
    userName.toLocaleUpperCase()
  );
  let docs: UserDetails[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    docs.push({
      userUID: data.userUID,
      userName: data.userName,
      displayName: data.displayName,
      photoURL: data.photoURL,
    } as UserDetails);
  });
  return docs[0];
}
