import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { CreateShowFormData } from "../schemas/showFormSchema";
import { Show } from "../models/Show";
import { Unsubscribe } from "firebase/auth";

function useUserShow(userUID: string) {
  const showCollectionRef = collection(db, "userShow");

  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getUserShowsByUID(userUID);
  }, []);

  async function addUserShow(data: CreateShowFormData, uid: string) {
    setLoading(true);
    try {
      await addDoc(showCollectionRef, {
        userUID: uid,
        name: data.name,
        currentEpisode: data.currentEpisode,
        currentSeason: data.currentSeason,
        status: data.status,
        type: data.type,
        score: data.score,
        startYear: data.startYear,
        endYear: data.endYear,
      });
    } catch (err) {
      // setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUserShow(showId: string) {
    setLoading(true);
    try {
      const showDocRef = doc(showCollectionRef, showId);
      await deleteDoc(showDocRef);
      setShows((prevShows) => prevShows.filter((show) => show.id !== showId));
    } catch (err) {
      // setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function getUserShowsByUID(uid: string) {
    let unsubscribe: Unsubscribe;
    setLoading(true);
    try {
      const queryTransaction = query(
        showCollectionRef,
        where("userUID", "==", uid)
      );
      unsubscribe = onSnapshot(queryTransaction, (snapshot) => {
        let docs: Show[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id } as Show);
        });
        setShows(docs);
      });
    } catch (err) {
      // setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }

    return () => unsubscribe();
  }

  return {
    shows,
    loading,
    // error,
    addUserShow,
    getUserShowsByUID,
    deleteUserShow,
  };
}

export default useUserShow;
