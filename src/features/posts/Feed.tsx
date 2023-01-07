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
import { Spinner } from "react-bootstrap";
import { PostCard } from "./PostCard";

interface FeedProps {}

export const Feed = (props: FeedProps) => {
  //TODO make a slice to handle the feed state

  const posts = useFirestoreInfiniteQuery("posts", postsQuery, (snapshot) => {
    const lastDocument = snapshot.docs[snapshot.docs.length - 1];
    if (lastDocument === undefined) return undefined;
    // Get the next 20 documents starting after the last document fetched.
    return query(postsQuery, startAfter(lastDocument));
  });

  if (posts.isLoading) {
    return (
      <div className="my-4">
        <Spinner />
      </div>
    );
  }
  if (posts.isError) {
    return <div>Please check your internet connection</div>;
  }

  const renderFeedCards = (postData: Post[]) => {
    if (postData.length === 0) return <></>;
    return (
      <div
        key={postData[0].postId + "-" + postData[postData.length - 1].postId}
      >
        {postData.map((post: Post) => (
          <PostCard post={post} key={post.postId} />
        ))}
        <div className="my-4"></div>
      </div>
    );
  };

  return posts.data && posts.data.pages ? (
    <div>
      {posts.data.pages.map((querySnapshot: QuerySnapshot<DocumentData>) => {
        const datas: Post[] = [];
        querySnapshot.forEach(function (doc: DocumentData) {
          datas.push(doc.data() as Post);
        });

        return renderFeedCards(datas);
      })}
      {posts.hasNextPage && (
        <button
          onClick={() => posts.fetchNextPage()}
          className="btn btn-secondary"
        >
          Load More
        </button>
      )}
      <div className="my-4 py-4"></div>
      <div className="my-4 py-4"></div>
    </div>
  ) : (
    <div>No posts</div>
  );
};
