import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { SignInScreen } from "./firebase-setup/SignInScreen";
import { Navigation } from "./features/navigation/Navigation";
import { auth } from "./firebase-setup/firebase-config";
import Container from "react-bootstrap/Container";

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

      return false;
    },
  };

  return (
    <Container className="App">
      {user === null ? <SignInScreen callbacks={callbacks} /> : <Navigation />}
    </Container>
  );
};

export default App;
