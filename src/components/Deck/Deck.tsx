/* eslint-disable no-param-reassign */
import { Button, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import {
  useAppDispatch, useAppSelector,
} from "../../hooks/hooks";
import { createCard, createDeck } from "../../reducers/deckReducer";
import CardList from "../CardList/CardList";
import { Container } from "./styles";

const Deck = ({ cards }: any) => {
  const dispatch = useAppDispatch();
  const token: string = useAppSelector((state: any) => state.user?.token);
  const [opened, setOpened] = useState(false);

  const handleAddDeck = async () => {
    const deck: any = await dispatch(createDeck(token));
    cards.cards.forEach((newCard: any) => {
      newCard.deckId = deck.payload.id;
      dispatch(createCard({ token, newCard } as any));
    });
    showNotification({
      title: "Deck Added",
      message: "Start learning!",
    });
  };

  return (
    <Container>
      <div>
        <h2>{cards.title}</h2>
        <p>
          {cards.cards.length}
          {" "}
          cards
        </p>
        <p>{cards.description}</p>
      </div>

      <div>
        <Button onClick={() => setOpened(true)}>View cards</Button>
        <Button onClick={() => handleAddDeck()}>Add Deck</Button>
      </div>

      <Modal
        size="auto"
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <CardList cards={cards.cards} viewOnly />
      </Modal>
    </Container>
  );
};

export default Deck;
