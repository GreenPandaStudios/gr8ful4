import { useState, ChangeEvent } from "react";

import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { userDisplayQuery } from "./UserQueries";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserDisplayInfo } from "../../types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-setup/firebase-config";
export const DisplayInfo = (props: { userId: string }) => {
  const [newName, setNewName] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(false);
  const { userId } = props;
  const userDisplayInfo = useFirestoreQueryData(
    ["display-info", { userId }],
    userDisplayQuery(userId),
    { subscribe: true }
  );
  const currentName: string =
    userDisplayInfo.data && userDisplayInfo.data[0]
      ? userDisplayInfo.data[0].name
      : "";

  if (
    !userDisplayInfo.isFetched ||
    userDisplayInfo.error ||
    !userDisplayInfo.data ||
    posting
  ) {
    return (
      <div className="my-4">
        <Spinner />
      </div>
    );
  }

  const onNameTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) setNewName(event.target.value);
  };
  const post = async () => {
    if (posting) {
      return;
    }
    if (!userId) {
      return;
    }
    const displayInfo: UserDisplayInfo = {
      name: newName,
    };

    setPosting(true);
    try {
      await setDoc(
        doc(db, "users", userId, "public-info", "display-info"),
        displayInfo
      );
    } catch {
      setError(true);
    }

    setPosting(false);
  };

  return (
    <>
      <Form.Label>Display Name</Form.Label>
      <Form.Control
        type="name"
        placeholder={userDisplayInfo.data[0].name}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onNameTextChanged(event)
        }
      />
      <Form.Text className="text-muted">Change your display name</Form.Text>
      {newName !== "" && currentName !== newName && (
        <Button variant="primary" disabled={posting} onClick={post}>
          Save changes
        </Button>
      )}
      {error && <div>Couldn't save changes</div>}
    </>
  );
};
