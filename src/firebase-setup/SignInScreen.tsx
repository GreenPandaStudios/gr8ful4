// Import FirebaseAuth and firebase.
import React, { memo, useMemo } from "react";
import { uiConfig } from "./firebase-config";
import { auth } from "./firebase-config";
import { StyledFirebaseAuth } from "./StyledFirebaseAuth";
import strings from "../app/strings";
import firebase from "firebase/compat/app";

export const SignInScreen = (config: firebaseui.auth.Config) => {
  //override the default with whatever we provide tot he component
  const thisConfig = { ...uiConfig, ...config };
  return (
    <div className="row">
      <h1>{strings.appName}</h1>
      <StyledFirebaseAuth uiConfig={thisConfig} firebaseAuth={auth} />
    </div>
  );
};

export default SignInScreen;
