// Import FirebaseAuth and firebase.
import React, { memo, useMemo } from "react";
import { uiConfig } from "./firebase-config";
import { auth } from "./firebase-config";
import { StyledFirebaseAuth } from "./StyledFirebaseAuth";
import strings from "../app/strings";

export const SignInScreen = (config: firebaseui.auth.Config) => {
  //override the default with whatever we provide tot he component
  const thisConfig = { ...uiConfig, ...config };
  return (
    <div className="container my-4">
      <h1 className="my-4">Sign in to {strings.appName}</h1>
      <div className="my-4">
        <StyledFirebaseAuth uiConfig={thisConfig} firebaseAuth={auth} />
      </div>
    </div>
  );
};

export default SignInScreen;
