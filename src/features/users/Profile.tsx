import React from "react";
import PropTypes from "prop-types";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { userDisplayQuery } from "./UserQueries";
import Spinner from "react-bootstrap/Spinner";
import { auth } from "../../firebase-setup/firebase-config";

export const Profile = () => {
  const userId = auth.currentUser.uid;
  const userDisplayInfo = useFirestoreQueryData(
    ["display-info", { userId }],
    userDisplayQuery(userId)
  );

  if (
    !userDisplayInfo.isFetched ||
    userDisplayInfo.error ||
    !userDisplayInfo.data
  ) {
    return (
      <div className="my-4">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <h1 className="display-2">Profile</h1>
      <div className="row">
        <div className="col-auto">Name: {userDisplayInfo.data[0].name}</div>
      </div>
    </>
  );
};
