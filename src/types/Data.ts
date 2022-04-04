import { FieldValue } from "firebase/firestore";

export type Data = {
  title: string;
  content: string;
  date: string;
  created_at: FieldValue;
};
