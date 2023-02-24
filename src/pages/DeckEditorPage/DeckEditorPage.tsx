import { ReactElement } from "react";
import { useGetDecksQuery } from "../../features/api/apiSlice";
import CardList from "../../features/decks/CardList/CardList";
import DeckEditor from "../../features/decks/DeckEditor/DeckEditor";
import DeckList from "../../features/decks/DeckList/DeckList";
import { useAppSelector, useCombinedDeck } from "../../hooks/hooks";
import { RootState } from "../../store";
import { Deck } from "../../types";
import { Container } from "./styles";

const DeckEditorPage = (): ReactElement => {
  const { data: decks = [] } = useGetDecksQuery();
  let activeDeck: any;
  const activeDeckId = useAppSelector((state: RootState) => state.decks.activeDeckId);
  if (activeDeckId === null) {
    activeDeck = useCombinedDeck(decks);
  } else {
    activeDeck = decks.find((deck: Deck) => deck.id === activeDeckId);
  }

  return (
    <Container>
      <DeckList noCreate={false} />
      <DeckEditor />
      <CardList cards={activeDeck?.cards ?? []} />
    </Container>
  );
};
export default DeckEditorPage;
