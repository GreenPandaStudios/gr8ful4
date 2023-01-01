import { FunctionComponent, useMemo } from "react";
import { selectPage, pages } from "./navSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import NavBar from "./NavBar";
import { NewPost } from "../posts/NewPost";
import Container from "react-bootstrap/Container";
import { Feed } from "../posts/Feed";
export const Navigation: FunctionComponent = () => {
  const page: pages = useAppSelector(selectPage);
  const currentPageComponent: JSX.Element | undefined = useMemo(() => {
    switch (page) {
      case "about":
        break;
      case "feed":
        return <Feed />;
      case "profile":
        break;
      case "settings":
        break;
      case "new-post":
        return <NewPost />;
    }
  }, [page]);

  return (
    <div className="w-100 h-100">
      <NavBar>{currentPageComponent}</NavBar>
    </div>
  );
};
