import {
  WhereFilterOp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { CreateShowFormData } from "../schemas/showFormSchema";
import { Show } from "../models/Show";

const showCollectionRef = collection(db, "userShow");

async function getUserShowsSnapshot(
  key: string,
  operator: WhereFilterOp,
  value: string
) {
  const queryTransaction = query(
    showCollectionRef,
    where(key, operator, value)
  );
  return await getDocs(queryTransaction);
}

export async function addUserShow({
  data,
  uid,
}: {
  data: CreateShowFormData;
  uid: string;
}) {
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
}

export async function deleteUserShow(showId: string) {
  const showDocRef = doc(showCollectionRef, showId);
  await deleteDoc(showDocRef);
}

export async function getUserShowsByUID(userUID: string) {
  const querySnapshot = await getUserShowsSnapshot("userUID", "==", userUID);
  let docs: Show[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    docs.push({ ...data, id } as Show);
  });
  return docs;
}
