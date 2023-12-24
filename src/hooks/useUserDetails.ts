import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState } from "react";
import { User } from "firebase/auth";
import { UserDetails } from "../models/UserDetails";

function useUserDetails() {
  const userDetailsCollectionRef = collection(db, "userDetails");

  const [details, setDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<Error | null>(null);

  async function addUserDetails(
    user: User,
    username: string,
    photoURL: string | null
  ) {
    setLoading(true);
    try {
      await addDoc(userDetailsCollectionRef, {
        userUID: user?.uid,
        userName: username.toLocaleUpperCase(),
        photoURL,
      });
    } catch (err) {
      // setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateUserDetails(
    userUID: string,
    username: string = "",
    photoURL: string = ""
  ) {
    setLoading(true);
    try {
      const userDetailsUpdate: { [key: string]: any } = {};
      if (username.trim() !== "")
        userDetailsUpdate.userName = username.trim().toUpperCase();

      if (photoURL.trim() !== "") userDetailsUpdate.photoURL = photoURL.trim();

      const queryTransaction = query(
        userDetailsCollectionRef,
        where("userUID", "==", userUID)
      );
      const querySnapshot = await getDocs(queryTransaction);
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, userDetailsUpdate);
      });
    } catch (err) {
      console.error(err);
      // setError(err); // Se você deseja tratar o erro em outro lugar, descomente esta linha
    } finally {
      setLoading(false);
    }
  }

  async function getUserDetails(user: User | null) {
    let details = null;
    setLoading(true);
    try {
      const queryTransaction = query(
        userDetailsCollectionRef,
        where("userUID", "==", user?.uid)
      );
      const querySnapshot = await getDocs(queryTransaction);
      let docs: UserDetails[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        docs.push({ userName: data.userName, userUID: id } as UserDetails);
      });
      if (docs[0]) {
        setDetails(docs[0]);
        details = docs[0];
      }
    } catch (err) {
      // setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }

    return details;
  }

  return {
    details,
    loading,
    // error,
    addUserDetails,
    getUserDetails,
    updateUserDetails,
  };
}

export default useUserDetails;
