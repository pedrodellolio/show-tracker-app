import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserDetails } from "../models/UserDetails";

const userDetailsCollectionRef = collection(db, "userDetails");

export async function getUserDetailsByUserName(userName: string) {
  const queryTransaction = query(
    userDetailsCollectionRef,
    where("userName", "==", userName.toLocaleUpperCase())
  );
  const querySnapshot = await getDocs(queryTransaction);
  let docs: UserDetails[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    docs.push({
      userName: data.userName,
      photoURL: data.photoURL,
      userUID: data.userUID,
    } as UserDetails);
  });
  return docs[0];
}
