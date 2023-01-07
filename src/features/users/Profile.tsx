import React from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, setUser } from "./userSlice";
import { DisplayInfo } from "./DisplayInfo";
import { auth } from "../../firebase-setup/firebase-config";
export const Profile = () => {
  const dispatch = useAppDispatch();
  const logout = () => auth.signOut();
  const user = useAppSelector(selectUser);
  return (
    <>
      <button
        className={"btn-block btn btn-dark row w-100"}
        onClick={() => logout()}
      >
        <i
          className="bi bi bi-box-arrow-left"
          style={{ fontSize: "1.5rem" }}
        ></i>
        Logout
      </button>
      <div className="card p-4 m-4">
        <DisplayInfo userId={user ? user.uid : ""} />
      </div>
    </>
  );
};
