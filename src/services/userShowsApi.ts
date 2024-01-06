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
import { UserShow } from "../models/UserShow";
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
  uid,
  data,
  tmdbShow,
}: {
  uid: string;
  data: CreateShowFormData;
  tmdbShow: Show | null;
}) {
  await addDoc(showCollectionRef, {
    userUID: uid,
    title: tmdbShow?.title,
    currentEpisode: data.currentEpisode,
    currentSeason: data.currentSeason,
    status: data.status,
    type: data.type,
    rating: data.rating,
    releaseDate: tmdbShow ? new Date(tmdbShow.release_date) : null,
    // startYear: data.startYear,
    // endYear: data.endYear,
  });
}

export async function deleteUserShow(showId: string) {
  const showDocRef = doc(showCollectionRef, showId);
  await deleteDoc(showDocRef);
}

export async function getUserShowsByUID(userUID: string) {
  const querySnapshot = await getUserShowsSnapshot("userUID", "==", userUID);
  let docs: UserShow[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    docs.push({ ...data, id } as UserShow);
  });
  return docs;
}
