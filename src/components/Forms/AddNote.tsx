import {
  Button,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Note } from "types/Note";
import { addNotes, getNotes } from "utils/notes";

export default function AddNote({
  uid,
  onClose,
}: {
  uid: string | undefined;
  onClose(): void;
}) {
  const date = new Date();
  const today = date.toLocaleString("us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(`${today}. `);

  async function handleAddNote() {
    if (uid) {
      const newNote: Note = {
        title,
        content,
        created_at: Timestamp.now(),
        favorited: false,
        id: uuidv4(),
      };
      const notes = await getNotes(uid);
      const newNotes = [...notes, newNote];
      await addNotes(uid, newNotes);
      onClose();
    }
  }

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New note</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column" gap={6}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Content"
            resize="none"
            cols={32}
            rows={16}
            value={content}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage="/notebookBackground.webp"
            color="#000"
            lineHeight="5"
            onChange={(e) => setContent(e.target.value)}
            pl={14}
            pr={2}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleAddNote}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}
