/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { ReactElement, useEffect, useState } from "react";
import Deck from "../../components/Deck/Deck";
import { useAppDispatch } from "../../hooks/hooks";
import { setUser } from "../../reducers/usersReducer";
import { alphabetCards, monthCards } from "../../utils/demoCards";
import { Container, DeckList } from "./styles";

const DiscoverPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string>("");

  return (
    <Container>
      <div>
        <form onChange={({ target }) => setFilter((target as HTMLInputElement).value)}>
          <input placeholder="Search Deck..." />
        </form>
      </div>

      <DeckList>
        <Deck cards={alphabetCards} />
        <Deck cards={monthCards} />
      </DeckList>

    </Container>
  );
};

export default DiscoverPage;
