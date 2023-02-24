/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useState } from "react";
import Deck from "../../features/decks/Deck/Deck";
import { useAppDispatch } from "../../hooks/hooks";
import { SearchBar } from "../../sharedStyles";
import { alphabetCards, monthCards } from "../../utils/demoCards";
import { Container, DeckList } from "./styles";

const DiscoverPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string>("");

  return (
    <Container>
      <form onChange={({ target }) => setFilter((target as HTMLInputElement).value)}>
        <SearchBar placeholder="Search" />
      </form>

      <DeckList>
        <Deck cards={alphabetCards} />
        <Deck cards={monthCards} />
      </DeckList>

    </Container>
  );
};

export default DiscoverPage;
