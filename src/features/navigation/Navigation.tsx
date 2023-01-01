import { FunctionComponent, useMemo } from "react";
import { selectPage, pages } from "./navSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import NavBar from "./NavBar";
import { NewPost } from "../posts/NewPost";
import Container from "react-bootstrap/Container";
import { Feed } from "../posts/Feed";
import { About } from "../about/About";
import strings from "../../app/strings";
import { Profile } from "../users/Profile";
export const Navigation: FunctionComponent = () => {
  const page: pages = useAppSelector(selectPage);
  const currentPageComponent: JSX.Element | undefined = useMemo(() => {
    switch (page) {
      case "about":
        return <About />;
      case "feed":
        return <Feed />;
      case "profile":
        return <Profile />;
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
