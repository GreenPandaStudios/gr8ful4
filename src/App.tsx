import React, { useState } from "react";
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

const App = () => {
  const [user, setUser] = useState(auth.currentUser);

  //override the callbacks in the default config object
  const callbacks = {
    // signInFailure callback must be provided to handle merge conflicts which
    // occur when an existing credential is linked to an anonymous user.
    signInFailure: function (
      error: firebaseui.auth.AuthUIError
    ): void | Promise<void> {
      // For merge conflicts, the error.code will be
      // 'firebaseui/anonymous-upgrade-merge-conflict'.
      if (error.code != "firebaseui/anonymous-upgrade-merge-conflict") {
        return Promise.resolve();
      }

      return;
    },
    signInSuccessWithAuthResult(
      // tslint:disable-next-line:no-any firebase dependency not available.
      authResult: any,
      redirectUrl?: string
    ) {
      setUser(authResult.user);
      //if this user first signed in, we want to set the username
      try {
        if (authResult.additionalUserInfo.isNewUser) {
          const username = authResult.additionalUserInfo.profile.name;
          if (username) {
            const userId = auth.currentUser?.uid;
            if (userId) {
              setDoc(doc(db, "users", userId, "public-info", "display-info"), {
                name: username,
              } as UserDisplayInfo);
            }
          }
        }
      } catch {
        /* do nothing*/
      }

      return false;
    },
  };

  return (
    <Container className="App">
      <div
        className="sticky-top bg-dark text-white w-100 mb-4"
        style={{ borderRadius: "0 0 2rem 2rem" }}
      >
        <h1 className="display-4 font-weight-normal">{strings.appName}</h1>
      </div>
      {user === null ? <SignInScreen callbacks={callbacks} /> : <Navigation />}
    </Container>
  );
};

export default App;
