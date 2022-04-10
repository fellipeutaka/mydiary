import Head from "next/head";
import NextLink from "next/link";
import { Avatar, Button, Flex, Stack, Tooltip } from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth";
import { Note } from "types/Note";
import { addNotes, notesCollection } from "utils/notes";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { AiOutlinePlus } from "react-icons/ai";
import { IoHomeOutline, IoExitOutline } from "react-icons/io5";

export default function App() {
  const date = new Date();
  const today = date.toLocaleString("us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const { user, authMethods } = useAuth();
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

      <Flex
        as="header"
        h="68px"
        justifyContent="space-between"
        alignItems="center"
        px={6}
      >
        <NextLink href="/app" passHref>
          <Button>
            <IoHomeOutline />
          </Button>
        </NextLink>
        <Stack direction="row" alignItems="center">
          <Button onClick={handleAddNote}>
            <AiOutlinePlus />
          </Button>
          <Tooltip label={user?.displayName}>
            <Avatar name={user?.displayName || ""} src={user?.photoURL || ""} />
          </Tooltip>
          <Button onClick={authMethods.signOut}>
            <IoExitOutline />
          </Button>
        </Stack>
      </Flex>
      <main>
        <h1>{today}.</h1>
        <div>
          {notes.map((note) => (
            <div key={note.id}>
              <h1>{note.title}</h1>
              <p>{note.content}</p>
              <span>
                {note.created_at.toDate().toLocaleDateString("en-US")}
              </span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
