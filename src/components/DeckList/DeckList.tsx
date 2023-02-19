import { ReactElement, useState } from "react";

import { Badge, Button } from "@mantine/core";
import {
  DeckSelector, DeckInfo, Container, Tags,
} from "./styles";

import {
  useAppDispatch, useAppSelector, useCardsDue, useCombinedDeck, useTagSelector,
} from "../../hooks/hooks";
import { createDeck, setActive } from "../../reducers/deckReducer";
import { Deck } from "../../types";

type DeckListProps = {
  noCreate: boolean;
}

const DeckList = ({ noCreate }: DeckListProps): ReactElement => {
  const [filter, setFilter] = useState<string>("");

  const dispatch = useAppDispatch();
  const token: string = useAppSelector((state: any) => state.user?.token);
  const decks: Deck[] = useAppSelector((state: any) => state.decks.allDecks);
  const activeDeck = useAppSelector((state: any) => state.decks.activeDeck);

  const decksToShow: Deck[] = filter === ""
    ? decks
    : decks.filter((deck: Deck) => (deck.title).toLowerCase().includes(filter.toLowerCase()));

  return (
    <Container>
      <DeckSelector noCreate={noCreate} active={activeDeck.title}>
        <form onChange={({ target }) => setFilter((target as HTMLInputElement).value)}>
          <input placeholder="Search Deck..." />
        </form>

        <Button onClick={() => dispatch(setActive(useCombinedDeck(decks)))}> All Cards</Button>
        <Button onClick={() => dispatch(createDeck(token))}> Create Deck</Button>

        {decksToShow.map((deck: any) => (
          <Button variant="outline" key={deck.id} onClick={() => dispatch(setActive(deck))}>
            <p>{deck.title}</p>
          </Button>
        ))}
      </DeckSelector>

      <Tags>
        {useTagSelector(decks).map((tag: string) => (
          <Badge key={tag} onClick={() => console.log(tag)}>
            {tag}
          </Badge>
        ))}
      </Tags>

      <DeckInfo>
        <p>
          {activeDeck.title}
        </p>
        <p>
          Total Cards:
          {" "}
          {activeDeck.cards.length}
        </p>
        <p>
          Due For Review:
          {" "}
          {useCardsDue(activeDeck.cards).length}
        </p>
      </DeckInfo>
    </Container>

  );
};

export default DeckList;
