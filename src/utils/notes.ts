import { firestore } from "config/firebaseConfig";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Note } from "types/Note";
import { UserDocumentData } from "types/UserDocumentData";

export function createCollection<T = DocumentData>(collectionName: string) {
  return collection(firestore, collectionName) as CollectionReference<T>;
}

export function createUserDocumentRef<T = DocumentData>(uid: string) {
  return doc(firestore, "users", uid) as DocumentReference<T>;
}

export async function addUsers(uid: string) {
  const notes: Note[] = [];
  await setDoc(createUserDocumentRef<UserDocumentData>(uid), { notes });
}

export async function isANewUser(uid: string) {
  const docSnap = await getDoc(createUserDocumentRef<UserDocumentData>(uid));
  return !docSnap.exists();
}
