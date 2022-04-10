import Head from "next/head";
import {
  Avatar,
  Button,
  Flex,
  Modal,
  Stack,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth";
import { Note } from "types/Note";
import { addNotes, notesCollection } from "utils/notes";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { IoHomeOutline, IoExitOutline } from "react-icons/io5";
import AddNote from "components/Forms/AddNote";
import Header from "components/General/Header";

export default function App() {
  interface NotesState extends Note {
    id: string;
  }

  function handleAddNote() {
    console.log("Add note");
  }
  const [notes, setNotes] = useState<NotesState[]>([]);
  useEffect(() => {
    (async () => {
      const unsub = onSnapshot(notesCollection, (doc) => {
        const data: NotesState[] = [];
        doc.forEach((note) => {
          const notes = {
            ...note.data(),
            id: note.id,
          };
          data.push(notes);
        });
        setNotes(data);
      });
      return () => unsub();
    })();
  }, []);

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
            <span>{note.created_at.toDate().toLocaleDateString("en-US")}</span>
          </div>
        ))}
      </main>
    </>
  );
}
