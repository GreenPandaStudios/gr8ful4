import { FunctionComponent } from "react";
import { auth } from "../../firebase-setup/firebase-config";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { selectPage, setPage, pages } from "./navSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
interface NavBarProps {
  children: JSX.Element | JSX.Element[] | undefined;
}

const NavBar: FunctionComponent<NavBarProps> = (props: NavBarProps) => {
  const imageUrl = auth.currentUser?.photoURL ?? "";

  const dispatch = useAppDispatch();
  const changePage = (page: pages) => dispatch(setPage(page));
  const page: pages = useAppSelector(selectPage);
  const { children } = props;
  return (
    <>
      <div className="container h-100">{children}</div>
      <div className="row fixed-bottom">
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <button
            style={{ borderRadius: 0 }}
            className={"btn btn" + "-dark"}
            onClick={() => changePage("feed")}
          >
            <i
              style={{ fontSize: "1.5rem" }}
              className={"bi bi-house" + (page === "feed" ? "-fill" : "")}
            ></i>
          </button>
          <button
            style={{ borderRadius: 0 }}
            className={"btn btn-dark"}
            onClick={() => changePage("new-post")}
          >
            <i
              style={{ fontSize: "1.5rem" }}
              className={
                "bi bi-plus-square" + (page === "new-post" ? "-fill" : "")
              }
            ></i>
          </button>
          <button
            style={{ borderRadius: 0 }}
            className={"btn btn-dark"}
            onClick={() => changePage("about")}
          >
            <i
              style={{ fontSize: "1.5rem" }}
              className={
                "bi bi-info-circle" + (page === "about" ? "-fill" : "")
              }
            ></i>
          </button>
          <button
            style={{ borderRadius: 0 }}
            className={"btn btn-dark"}
            onClick={() => changePage("profile")}
          >
            <Image
              onClick={() => changePage("profile")}
              src={imageUrl}
              className="rounded-circle"
              height={"36px"}
              alt="Profile"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
