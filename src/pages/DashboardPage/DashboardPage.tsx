import { ReactElement, useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { setUser } from "../../features/users/usersSlice";
import { Container } from "./styles";

const DashboardPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  // const currentUser = useAppSelector((state: any) => state.user);

  useEffect((): void => {
    const session: any = window.localStorage.getItem("currentUser");
    const sessionParsed = JSON.parse(session);
    dispatch(setUser(sessionParsed));
  }, []);

  return (
    <Container>
      <p>under construction</p>
    </Container>
  );
};

export default DashboardPage;
