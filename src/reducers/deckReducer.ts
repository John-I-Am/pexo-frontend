/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { createSlice } from "@reduxjs/toolkit";
import deckService from "../services/decks";
import cardService from "../services/cards";
import {
  Card, Deck, NewCard,
} from "../types";
import { useCombinedDeck } from "../hooks/hooks";

const deckSlice: any = createSlice({
  name: "decks",
  initialState: {
    allDecks: [],
    activeDeck: { title: "", cards: [] },
  },
  reducers: {
    initDeck(state: any, action: any) {
      state.allDecks = action.payload;
    },
    addDeck(state: any, action: any) {
      state.allDecks.push({ ...action.payload, cards: action.payload.cards || [] });
    },
    editDeck(state: any, action: any) {
      state.allDecks = state.allDecks.map((deck: Deck) => (deck.id === action.payload.id
        ? action.payload
        : deck));

      state.activeDeck = action.payload;
    },
    removeDeck(state: any, action: any) {
      state.allDecks = state.allDecks.filter((deck: Deck) => (deck.id !== action.payload.id));

      state.activeDeck = useCombinedDeck(state.allDecks);
    },
    setActive(state: any, action: any) {
      state.activeDeck = { ...action.payload, cards: action.payload.cards || [] };
    },
    addCard(state: any, action: any) {
      if (state.activeDeck?.id === action.payload.deckId) {
        state.activeDeck.cards.push(action.payload);
      }

      state.allDecks.forEach((deck: any, id: any) => {
        if (deck.id === action.payload.deckId) {
          state.allDecks[id].cards.push(action.payload);
        }
      });
    },
    deleteCard(state: any, action: any) {
      state.activeDeck.cards = state.activeDeck.cards.filter(
        (card: Card) => card.id !== action.payload.id,
      );

      state.allDecks = state.allDecks.map(
        (deck: Deck) => (deck.id === action.payload.deckId
          ? { ...deck, cards: deck.cards?.filter((card: any) => card.id !== action.payload.id) }
          : deck),
      );
    },
    editCard(state: any, action: any) {
      state.activeDeck.cards = state.activeDeck.cards.map(
        (card: Card) => (card.id !== action.payload.id ? card : action.payload),
      );

      state.allDecks = state.allDecks.map(
        (deck: Deck) => (deck.id === action.payload.deckId
          ? {
            ...deck,
            cards: deck.cards?.map((card: Card) => (card.id === action.payload.id
              ? action.payload
              : card)),
          }
          : deck),
      );
    },
  },
});

export const {
  addDeck, initDeck, setActive, editDeck, removeDeck, addCard, deleteCard, editCard,
} = deckSlice.actions;

export const createDeck = (
  token: string,
) => async (dispatch: any): Promise<void> => {
  try {
    const response = await deckService.create(token);
    dispatch(addDeck(response));
    return response;
  } catch (e: any) {
    console.log(e);
    return (e.response.data.error);
  }
};

export const updateDeck = (
  token: string,
  updatedDeck: Deck,
) => async (dispatch: any): Promise<void> => {
  try {
    await deckService.update(token, updatedDeck);
    dispatch(editDeck(updatedDeck));
  } catch (e: any) {
    console.log(e);
    return (e.response.data.error);
  }
};

export const deleteDeck = (
  token: string,
  deckToDelete: Deck,
) => async (dispatch: any): Promise<void> => {
  try {
    await deckService.remove(token, deckToDelete);
    dispatch(removeDeck(deckToDelete));
  } catch (e: any) {
    console.log(e);
    return (e.response.data.error);
  }
};

export const initializeDeck = (
  token: string,
) => async (dispatch: any): Promise<void> => {
  try {
    const response = await deckService.getAll(token);
    dispatch(initDeck(response));
  } catch (e: any) {
    console.log(e);
    return (e.response.data.error);
  }
};

export const createCard = (
  token: string,
  newCard: NewCard,
) => async (dispatch: any): Promise<void> => {
  try {
    const response = await cardService.create(token, newCard);
    dispatch(addCard(response));
  } catch (e: any) {
    console.log(e);
    return (e.response.data.error);
  }
};

export const updateCard = (
  token: string,
  updatedValues: any,
  cardId: any,
) => async (dispatch: any): Promise<void> => {
  try {
    const updatedCard = await cardService.update(token, updatedValues, cardId);
    dispatch(editCard(updatedCard));
  } catch (e) {
    console.log(e);
  }
};

export const removeCard = (
  token: string,
  cardToDelete: Card,
) => async (dispatch: any): Promise<void> => {
  try {
    await cardService.remove(token, cardToDelete);
    dispatch(deleteCard(cardToDelete));
  } catch (e: any) {
    console.log(e);
    return (e.response.data.error);
  }
};

export default deckSlice.reducer;
