import { ReactElement } from "react";

import CardList from "../../components/CardList/CardList";
import DeckEditor from "../../components/DeckEditor/DeckEditor";
import DeckList from "../../components/DeckList/DeckList";
import { useAppSelector } from "../../hooks/hooks";
import { Container } from "./styles";

const DeckEditorPage = (): ReactElement => {
  const cards = useAppSelector((state: any) => state.decks.activeDeck.cards);
  return (
    <Container>
      <DeckList noCreate={false} />
      <DeckEditor />
      <CardList cards={cards} />
    </Container>
  );
};
export default DeckEditorPage;
