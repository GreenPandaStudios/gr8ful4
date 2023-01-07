import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { SignInScreen } from "./firebase-setup/SignInScreen";
import { Navigation } from "./features/navigation/Navigation";
import { auth, db } from "./firebase-setup/firebase-config";
import Container from "react-bootstrap/Container";
import strings from "./app/strings";
import { doc, setDoc } from "firebase/firestore";
import { UserDisplayInfo } from "./types";
import { useAuthUser } from "@react-query-firebase/auth/dist/auth/src/useAuthUser";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectUser, setUser, usertype } from "./features/users/userSlice";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(
            setUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            })
          );
        } else {
          dispatch(setUser(null));
        }
      }),
    []
  );
  const currentUser = useAppSelector(selectUser);

  return (
    <Container className="App">
      <div
        className="sticky-top bg-dark text-white w-100 mb-4"
        style={{ borderRadius: "0 0 2rem 2rem" }}
      >
        <h1 className="display-4 font-weight-normal">{strings.appName}</h1>
      </div>
      {currentUser === null ? <SignInScreen /> : <Navigation />}
    </Container>
  );
};

export default App;
