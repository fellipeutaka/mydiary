import { Timestamp } from "firebase/firestore";

export type Note = {
  title: string;
  content: string;
  created_at: Timestamp;
};
