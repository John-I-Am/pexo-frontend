import { ReactElement, useState } from "react";
import { useAppSelector, useCardsDue, useCombinedDeck } from "../../hooks/hooks";
import CardComponent from "../../features/decks/Card/Card";
import DeckList from "../../features/decks/DeckList/DeckList";

import { Container, NoCards } from "./styles";
import done from "../../assets/done.svg";
import { Card, Deck } from "../../types";
import CardNote from "../../features/decks/CardNote/CardNote";
import { useGetDecksQuery } from "../../features/api/apiSlice";
import { RootState } from "../../store";

const Cardless = (): ReactElement => (
  <NoCards>
    <img src={done} alt="empty deck" />
    <div>
      <h2>All Done :)</h2>
      <h2> No Cards Due For Review In This Deck </h2>
    </div>
  </NoCards>
);

const StudyPage = (): ReactElement => {
  const { data: allDecks = [] } = useGetDecksQuery();
  let activeDeck: any;
  const activeDeckId = useAppSelector((state: RootState) => state.decks.activeDeckId);
  if (activeDeckId === null) {
    activeDeck = useCombinedDeck(allDecks);
  } else {
    activeDeck = allDecks.find((deck: Deck) => deck.id === activeDeckId);
  }

  const cardsToStudy: Card[] = useCardsDue(activeDeck?.cards ?? []);

  const [answerChecked, setAnswerChecked] = useState(false);

  return (
    <Container>
      <DeckList noCreate />

      {cardsToStudy.length !== 0
        ? (
          <>
            <CardComponent cardToStudy={cardsToStudy[0]} showNotes={setAnswerChecked} />
            <CardNote notes={cardsToStudy[0]?.examples} visible={answerChecked} />
          </>
        )
        : (
          <Cardless />
        )}
    </Container>
  );
};

export default StudyPage;
