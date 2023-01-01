import { db } from "../../firebase-setup/firebase-config";
import { collectionGroup, query, limit } from "firebase/firestore";

const postsCollection = collectionGroup(db, "posts");
export const postsQuery = query(postsCollection, limit(20));
