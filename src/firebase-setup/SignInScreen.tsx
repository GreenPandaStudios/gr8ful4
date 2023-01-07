// Import FirebaseAuth and firebase.
import React, { memo, useMemo } from "react";
import Accordion from "react-bootstrap/Accordion";
import { uiConfig } from "./firebase-config";
import { auth } from "./firebase-config";
import { StyledFirebaseAuth } from "./StyledFirebaseAuth";
import strings from "../app/strings";
import { About } from "../features/about/About";

export const SignInScreen = () => {
  //override the default with whatever we provide tot he component
  return (
    <div className="container my-4">
      <div className="my-4 card">
        <h1 className="my-4">Sign in to {strings.appName}</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
      <div className="my-4"></div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>About Gr8ful4</Accordion.Header>
          <Accordion.Body>
            <About />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default SignInScreen;
