import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState } from "react";
import useAuth from "./useAuth";
import { User } from "firebase/auth";
import { UserDetails } from "../models/UserDetails";

function useUserDetails() {
  const userDetailsCollectionRef = collection(db, "userDetails");
  const { user } = useAuth();

  const [details, setDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<Error | null>(null);

  async function addUserDetails(username: string) {
    setLoading(true);
    try {
      await addDoc(userDetailsCollectionRef, {
        userUID: user?.uid,
        userName: username.toLocaleUpperCase(),
      });
    } catch (err) {
      // setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // function getUserDetails(currentUser: User | null) {
  //   setLoading(true);
  //   try {
  //     const queryTransaction = query(
  //       userDetailsCollectionRef,
  //       where("userUID", "==", currentUser?.uid)
  //     );
  //     onSnapshot(queryTransaction, (snapshot) => {
  //       let docs: UserDetails[] = [];
  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         const id = doc.id;
  //         docs.push({ userName: data.userName, userUID: id } as UserDetails);
  //       });
  //       if (docs[0]) {
  //         setDetails(docs[0]);
  //       }
  //     });
  //   } catch (err) {
  //     // setError(err);
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  async function getUserDetails(currentUser: User | null) {
    let hasDetails = false;
    setLoading(true);
    try {
      const queryTransaction = query(
        userDetailsCollectionRef,
        where("userUID", "==", currentUser?.uid)
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
        hasDetails = true;
      }
    } catch (err) {
      // setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }

    return hasDetails;
  }

  return {
    details,
    loading,
    // error,
    addUserDetails,
    getUserDetails,
  };
}

export default useUserDetails;
