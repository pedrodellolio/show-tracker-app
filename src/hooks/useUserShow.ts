import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { CreateShowFormData } from "../schemas/showFormSchema";
import useAuth from "./useAuth";
import { Show } from "../models/Show";

function useUserShow() {
  const showCollectionRef = collection(db, "userShow");
  const { user } = useAuth();

  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getUserShows();
  }, []);

  async function addUserShow(data: CreateShowFormData) {
    setLoading(true);
    try {
      await addDoc(showCollectionRef, {
        userUID: user?.uid,
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

  function getUserShows() {
    setLoading(true);
    try {
      const queryTransaction = query(
        showCollectionRef,
        where("userUID", "==", user?.uid)
      );
      onSnapshot(queryTransaction, (snapshot) => {
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
  }

  return {
    shows,
    loading,
    error,
    addUserShow,
    getUserShows,
  };
}

export default useUserShow;
