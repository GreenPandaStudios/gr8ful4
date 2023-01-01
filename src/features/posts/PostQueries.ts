import { db } from "../../firebase-setup/firebase-config";
import { collectionGroup, query, limit, orderBy } from "firebase/firestore";

const postsCollection = collectionGroup(db, "posts");
export const postsQuery = query(
  postsCollection,
  limit(10),
  orderBy("date", "desc")
);
