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

  const displayName =
    userDisplayInfo.isFetched && userDisplayInfo.data && userDisplayInfo.data[0]
      ? userDisplayInfo.data[0].name
      : "Somebody";

  return (
    <div>
      <div className="my-4"></div>
      <div className={"row"}>
        <div className="col">
          <div className="card">
            <p className="m-4">{post.postText}</p>
            <div className="row">
              <span className="text-muted">
                {displayName} was grateful on{" "}
                {post.date.toDate().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4"></div>
    </div>
  );
};
