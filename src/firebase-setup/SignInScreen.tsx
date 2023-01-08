// Import FirebaseAuth and firebase.
import React, { memo, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { uiConfig } from "./firebase-config";
import { auth } from "./firebase-config";
import { StyledFirebaseAuth } from "./StyledFirebaseAuth";
import strings from "../app/strings";
import { About } from "../features/about/About";
import Spinner from "react-bootstrap/Spinner";

export const SignInScreen = () => {
  const [signInStatus, setStatus] = useState<"loading" | "error" | "done">(
    "done"
  );

  const handleGuestSignIn = async () => {
    if (signInStatus === "loading") {
      return;
    }
    setStatus("loading");
    auth
      .signInAnonymously()
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === "auth/operation-not-allowed") {
          alert("You must enable Anonymous auth in the Firebase Console.");
        } else {
          console.error(error);
        }
        setStatus("error");
      })
      .finally(() => {
        setStatus("done");
      });
  };

  return (
    <div className="container my-4">
      <div className="m-2 card">
        <h1 className="my-4">Sign in to {strings.appName}</h1>

        {signInStatus === "loading" ? (
          <div className="col">
            <Spinner />
          </div>
        ) : (
          <>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            <span> OR </span>
            <div className="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner">
              <div className="firebaseui-card-content">
                <ul className="firebaseui-idp-list">
                  <li className="firebaseui-list-item">
                    <button
                      className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised"
                      onClick={handleGuestSignIn}
                      style={{ backgroundColor: "black" }}
                    >
                      <span className="firebaseui-idp-icon-wrapper text-light">
                        <i className={"bi bi-person-x-fill"}></i>
                      </span>

                      <span className="firebaseui-idp-text firebaseui-idp-text-long">
                        Continue as Guest
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        {signInStatus === "error" && (
          <div>Something went wrong, please try again.</div>
        )}
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
