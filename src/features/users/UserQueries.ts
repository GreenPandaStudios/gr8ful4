import { db } from "../../firebase-setup/firebase-config";
import { collection, query } from "firebase/firestore";

const userDisplayDoc = (userId: string) =>
  collection(db, "users", userId, "public-info");
export const userDisplayQuery = (userId: string) =>
  query(userDisplayDoc(userId));
