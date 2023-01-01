import React from "react";
import { connect } from "react-redux";
import { db } from "../../firebase-setup/firebase-config";
import {
  collectionGroup,
  query,
  limit,
  where,
  startAfter,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { postsQuery } from "./PostQueries";
import { useFirestoreInfiniteQuery } from "@react-query-firebase/firestore";
import { Post } from "../../types";

interface FeedProps {}

export const Feed = (props: FeedProps) => {
  //TODO make a slice to handle the feed state

  const posts = useFirestoreInfiniteQuery("posts", postsQuery, (snapshot) => {
    const lastDocument = snapshot.docs[snapshot.docs.length - 1];

    // Get the next 20 documents starting after the last document fetched.
    return query(postsQuery, startAfter(lastDocument));
  });

  if (posts.isLoading) {
    return <div>Loading...</div>;
  }
  if (posts.isError) {
    return <div>{posts.error.message}</div>;
  }

  const renderFeedCards = (posts: Post[]) => {
    return posts.map((post: Post) => (
      <>
        <div>{post.postText}</div>
        <div>{post.date.toDate().toLocaleDateString()}</div>
      </>
    ));
  };

  return posts.data && posts.data.pages ? (
    <>
      {posts.data.pages.map((querySnapshot: QuerySnapshot<DocumentData>) => {
        const datas: Post[] = [];
        querySnapshot.forEach(function (doc: DocumentData) {
          datas.push(doc.data() as Post);
          console.log(doc.data());
        });

        return renderFeedCards(datas);
      })}
    </>
  ) : (
    <div>none</div>
  );
};
