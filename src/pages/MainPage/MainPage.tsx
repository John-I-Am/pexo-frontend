import { Outlet } from "react-router-dom";
import {
  ReactElement, useEffect, useRef,
} from "react";

import { ActionIcon } from "@mantine/core";
import { fetchUser, setUser } from "../../reducers/usersReducer";
import { fetchDecks } from "../../reducers/deckReducer";
import { useAppDispatch } from "../../hooks/hooks";

import NavBar from "../../components/NavBar/NavBar";
import { Container } from "./styles";
import { ReactComponent as ChevronRight } from "../../assets/chevronRight.svg";

interface localStorage {
  token: string
  userId: string
}

const MainPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const expandRef: any = useRef();

  useEffect(() => {
    let currentUserParsed: localStorage | null;

    const currentUser: string | null = window.localStorage.getItem("currentUser");
    if (currentUser) {
      currentUserParsed = JSON.parse(currentUser);
      dispatch(setUser(currentUserParsed));
      // eslint-disable-next-line max-len
      dispatch(fetchUser({ token: currentUserParsed?.token as string, id: currentUserParsed?.userId as string } as any));
      dispatch(fetchDecks(currentUserParsed?.token as string));
    } else {
      alert("Session expired or user not found");
    }
  }, []);

  return (
    <Container>
      <NavBar ref={expandRef} />
      <ActionIcon className="expand-drawer" onClick={() => expandRef.current.toggleExpanded()}>
        <ChevronRight />
      </ActionIcon>
      <Outlet />
    </Container>
  );
};

export default MainPage;
