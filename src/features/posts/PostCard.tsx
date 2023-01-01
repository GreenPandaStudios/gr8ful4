import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Post } from "../../types";
import Spinner from "react-bootstrap/Spinner";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { query } from "firebase/firestore";
import { userDisplayQuery } from "../users/UserQueries";
import { auth } from "../../firebase-setup/firebase-config";
interface PostCardProps {
  post: Post;
}

export const PostCard = (props: PostCardProps) => {
  const { post } = props;
  const { userId } = post;
  const userDisplayInfo = useFirestoreQueryData(
    ["display-info", { userId }],
    userDisplayQuery(userId)
  );

  return (
    <div key={post.postId}>
      <div className="my-4"></div>
      <div className={"row"}>
        <h6
          className="text-muted my-4 mx-0 col-auto"
          style={{
            writingMode: "vertical-rl",
          }}
        >
          {post.date.toDate().toLocaleDateString()}
          <br></br>
          {post.date.toDate().toLocaleTimeString()}
        </h6>

        <div className="col">
          {userDisplayInfo.isFetched &&
            userDisplayInfo.data &&
            userDisplayInfo.data[0] &&
            userDisplayInfo.data[0].name && (
              <>
                <h6 className="card-title">{userDisplayInfo.data[0].name}</h6>
              </>
            )}
          <div className="card">
            <p className="card-text text-muted text-justify-right">
              I'm gr8ful4 ...
            </p>
            <p className="card-text  mb-4">{post.postText}</p>
          </div>
        </div>
      </div>
      <div className="my-4"></div>
    </div>
  );
};
