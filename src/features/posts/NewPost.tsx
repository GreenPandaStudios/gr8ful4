import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useCallback } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase-setup/firebase-config";
import { useAppDispatch } from "../../app/hooks";
import { pages, setPage } from "../navigation/navSlice";
import { Post } from "../../types";
import { v4 as uuidv4 } from "uuid";
export const NewPost = () => {
  const MAX_TEXT_LENGTH = 1024;

  const [postText, setPostText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const changePage = (page: pages) => dispatch(setPage(page));
  const post = async () => {
    if (posting) {
      return;
    }
    const userId = auth.currentUser ? auth.currentUser.uid ?? null : null;
    if (!userId) {
      return;
    }
    const postData: Post = {
      postText: postText,
      userId: userId,
      date: Timestamp.now(),
      likes: [],
      postId: uuidv4(),
    };
    setPosting(true);
    setError(false);
    try {
      await setDoc(
        doc(db, "users", userId, "posts", postData.postId),
        postData
      );
      changePage("feed");
    } catch {
      setError(true);
    }

    setPosting(false);
  };

  function onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setText(event.target.value);
  }

  function setText(text: string) {
    //Do not allow new lines
    const newLineRegex = /\r\n|\r|\n/gi;
    const newText = text.replaceAll(newLineRegex, " ");
    text = newText;
    //validate the text length
    const cnt = newText.length;
    if (cnt > MAX_TEXT_LENGTH) {
      //revert the text
      text = postText;
      return;
    }

    //text is valid
    setCharCount(cnt);
    setPostText(newText);
  }

  return (
    <>
      <div className="jumbotron my-4">
        <h1 className="display-4">I'm gr8ful4 ...</h1>
        <textarea
          className="w-100 h-100 d-flex p-8 align-self-center"
          autoFocus
          style={{
            border: "none",
            resize: "none",
            textAlign: "center",
            borderStyle: "none",
            borderColor: "Transparent",
            overflow: "auto",
            outline: "none",
          }}
          rows={10}
          disabled={posting}
          onChange={onTextChange}
        />
        <hr className="my-4" />
        <div className="my-4">
          {MAX_TEXT_LENGTH - charCount}/{MAX_TEXT_LENGTH} characters remaining
        </div>

        {error && (
          <div className="my-4">Something went wrong, please try again.</div>
        )}
        <button
          disabled={posting}
          onClick={() =>
            setText(postText.length === 0 ? "gr8ful4" : postText + " gr8ful4")
          }
          className="row btn btn-secondary"
        >
          gr8ful4
        </button>
        <button
          disabled={posting || charCount === 0}
          onClick={post}
          className="row btn btn-primary"
        >
          Share My Gratitude
        </button>
      </div>
      <div></div>
    </>
  );
};
