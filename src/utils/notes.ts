import { firestore } from "config/firebaseConfig";
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { Note } from "types/Note";

function createCollection<T = DocumentData>(collectionName: string) {
  return collection(firestore, collectionName) as CollectionReference<T>;
}

export const notesCollection = createCollection<Note>("notes");

export async function addNotes() {
  await addDoc(notesCollection, {
    title: "Second Note",
    content: "Sla mermao",
    created_at: serverTimestamp(),
  });
}
