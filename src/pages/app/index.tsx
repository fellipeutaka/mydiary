import Head from "next/head";
import { useAuth } from "hooks/useAuth";
import { Note } from "types/Note";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import Header from "components/General/Header";
import { createUserDocumentRef } from "utils/notes";
import { UserDocumentData } from "types/UserDocumentData";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useAuth();

  function handleAddNote() {
    console.log("Add note");
  }

  useEffect(() => {
    (async () => {
      if (user) {
        const unsub = onSnapshot(
          createUserDocumentRef<UserDocumentData>(user.uid),
          (doc) => {
            if (doc.data()?.notes) {
              setNotes(doc.data()!.notes);
            }
          }
        );
        return () => unsub();
      }
    })();
  }, [user]);

  return (
    <>
      <Head>
        <title>My Diary</title>
        <meta name="description" content="My Diary" />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>
      <Header />
      <main>
        {notes.map((note) => (
          <div key={note.id}>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <span>{note.created_at.toDate().toLocaleDateString()}</span>
            {note.favorited ? <AiFillHeart /> : <AiOutlineHeart />}
          </div>
        ))}
      </main>
    </>
  );
}
