import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState } from "react";
import { UserDetails } from "../models/UserDetails";

function useAllUsersDetails() {
  const allUsersDetailsCollectionRef = collection(db, "userDetails");

  const [users, setUsers] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<Error | null>(null);

  async function getAllUsersDetailsByInput(value: string) {
    setLoading(true);
    try {
      const queryTransaction = query(
        allUsersDetailsCollectionRef,
        where("userName", ">=", value.toLocaleUpperCase()),
        where("userName", "<=", value.toLocaleUpperCase() + "\uf8ff")
      );
      const querySnapshot = await getDocs(queryTransaction);
      let docs: UserDetails[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        docs.push({ userName: data.userName, userUID: id } as UserDetails);
      });
      setUsers(docs);
    } catch (err) {
      // setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    users,
    loading,
    // error,
    getAllUsersDetailsByInput,
  };
}

export default useAllUsersDetails;
