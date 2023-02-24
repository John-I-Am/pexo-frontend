import { ReactElement, useState } from "react";

import { Badge, Button } from "@mantine/core";
import {
  DeckSelector, Container, Tags,
} from "./styles";

import {
  useAppDispatch, useTagSelector,
} from "../../../hooks/hooks";
import { setActive } from "../decksSlice";
import { useAddNewDeckMutation, useGetDecksQuery } from "../../api/apiSlice";
import { Deck } from "../../../types";
import { SearchBar } from "../../../sharedStyles";

type DeckListProps = {
  noCreate: boolean;
}

const DeckList = ({ noCreate }: DeckListProps): ReactElement => {
  const [filter, setFilter] = useState<string>("");
  const dispatch = useAppDispatch();
  const [addNewDeck] = useAddNewDeckMutation();
  const { data: decks = [] } = useGetDecksQuery();

  const decksToShow: Deck[] = filter === ""
    ? decks
    : decks.filter((deck: Deck) => (deck.title).toLowerCase().includes(filter.toLowerCase()));

  return (
    <Container>
      <DeckSelector noCreate={noCreate}>
        <form onChange={({ target }) => setFilter((target as HTMLInputElement).value)}>
          <SearchBar placeholder="Search" />
        </form>
        <Button onClick={() => dispatch(setActive(null as any))}> All</Button>
        <Button onClick={() => addNewDeck()}> New </Button>
        <div>
          {decksToShow.map((deck: any) => (
            <Button variant="outline" key={deck.id} onClick={() => dispatch(setActive(deck.id))}>
              <p>{deck.title}</p>
            </Button>
          ))}
        </div>
      </DeckSelector>

      <Tags>
        {useTagSelector(decks).map((tag: string) => (
          <Badge key={tag} onClick={() => console.log(tag)}>
            {tag}
          </Badge>
        ))}
      </Tags>
    </Container>

  );
};

export default DeckList;
