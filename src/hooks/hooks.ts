import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useGetDecksQuery } from "../features/api/apiSlice";
import type { RootState, AppDispatch } from "../store";
import { Card, Deck } from "../types";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCombinedDeck = (decks: Deck[]): any => {
  let allCards: Card[] = [];
  decks.forEach((deck: Deck) => {
    if (deck.cards) {
      allCards = allCards.concat(deck.cards);
    }
  });

  return { cards: allCards };
};

export const useActiveDeck = (): Deck => {
  let activeDeck: Deck;

  const { data: allDecks = [] } = useGetDecksQuery();
  const deckId: number | null = useAppSelector((state: RootState) => state.decks.activeDeckId);

  if (deckId === null) {
    activeDeck = useCombinedDeck(allDecks);
  } else {
    activeDeck = allDecks.find((deck: Deck) => deck.id === deckId);
  }

  return activeDeck;
};

export const useCardsDue = (cards: Card[]): Card[] => {
  const cardsDue = cards?.filter((card: any) => (
    new Date(card.checkpointDate)).getTime() <= new Date().getTime());

  return cardsDue;
};

export const useTagSelector = (decks: Deck[]): any => {
  let tags: string[] = [];
  decks.forEach((deck: Deck) => {
    deck.cards?.forEach((card: any) => {
      if (card.tags) {
        tags = tags.concat(card.tags);
      }
    });
  });
  return Array.from(new Set(tags));
};
