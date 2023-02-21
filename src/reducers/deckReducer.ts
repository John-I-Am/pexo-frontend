/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import deckService from "../services/decks";
import cardService from "../services/cards";
import {
  Card, Deck, NewCard,
} from "../types";
import { useCombinedDeck } from "../hooks/hooks";

type SliceStatus = "idle" | "loading" | "succeeded" | "failed"

interface DeckState {
  allDecks: Deck[];
  activeDeck: Deck;
  status: SliceStatus;
}

export const fetchDecks = createAsyncThunk("decks/fetchDecks", async (token: string): Promise<Deck[]> => {
  const response: Deck[] = await deckService.getAll(token);
  return response;
});

export const createDeck = createAsyncThunk("decks/createDeck", async (token: string): Promise<Deck> => {
  const response: Deck = await deckService.create(token);
  return response;
});

export const updateDeck = createAsyncThunk("decks/updateDeck", async ({ token, updatedDeck }: {token: string, updatedDeck: Deck}): Promise<any> => {
  const response: Deck = await deckService.update(token, updatedDeck);
  return response;
});

export const deleteDeck = createAsyncThunk("decks/deleteDeck", async ({ token, deckToDelete }: {token: string, deckToDelete: Deck}): Promise<any> => {
  const response = await deckService.update(token, deckToDelete);
  return response;
});

export const createCard = createAsyncThunk("decks/createCard", async ({ token, newCard }: {token: string, newCard: NewCard}): Promise<any> => {
  const response = await cardService.create(token, newCard);
  return response;
});

export const updateCard = createAsyncThunk("decks/updateCard", async ({ token, updatedValues, cardId }: {token: string, updatedValues: any, cardId: any}): Promise<any> => {
  const response = await cardService.update(token, updatedValues, cardId);
  return response;
});

export const removeCard = createAsyncThunk("decks/removeCard", async ({ token, cardToDelete }: {token: string, cardToDelete: any}): Promise<any> => {
  const response = await cardService.remove(token, cardToDelete);
  return response;
});

const deckSlice = createSlice({
  name: "decks",
  initialState: {
    allDecks: [] as Deck[],
    activeDeck: { title: "", cards: [] as Card[] } as Deck,
    status: "idle" as SliceStatus,
  } as DeckState,
  reducers: {
    setActive(state: any, action: any) {
      state.activeDeck = { ...action.payload, cards: action.payload.cards || [] };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDecks.pending, (state: DeckState) => {
        state.status = "loading";
      })
      .addCase(fetchDecks.fulfilled, (state: DeckState, action: PayloadAction<Deck[]>) => {
        state.status = "succeeded";
        state.allDecks = action.payload;
      })
      .addCase(createDeck.fulfilled, (state: DeckState, action: PayloadAction<Deck>) => {
        state.allDecks.push(action.payload);
        // temp solution for strange bug where cards disappear
        const temp = action.payload;
        temp.cards = [];
        state.activeDeck = temp;
      })
      .addCase(updateDeck.fulfilled, (state: DeckState, action: PayloadAction<Deck>) => {
        state.allDecks = state.allDecks.map((deck: Deck) => (deck.id === action.payload.id
          ? action.payload
          : deck));

        // temp solution for strange bug where cards disappear
        const temp = action.payload;
        temp.cards = [];
        state.activeDeck = temp;
      })
      .addCase(deleteDeck.fulfilled, (state: DeckState, action: PayloadAction<Deck>) => {
        state.allDecks = state.allDecks.filter((deck: Deck) => (deck.id !== action.payload.id));

        state.activeDeck = useCombinedDeck(state.allDecks);
      })
      .addCase(deleteDeck.rejected, (state, action) => {
        console.log("rferferf");
        console.log(action.payload);
      })
      .addCase(createCard.fulfilled, (state: DeckState, action: PayloadAction<Card>) => {
        if (state.activeDeck?.id === action.payload.deckId) {
          state.activeDeck.cards?.push(action.payload);
        }

        state.allDecks.forEach((deck: any, id: any) => {
          if (deck.id === action.payload.deckId) {
            state.allDecks[id].cards?.push(action.payload);
          }
        });
      })
      .addCase(updateCard.fulfilled, (state: DeckState, action: PayloadAction<Card>) => {
        state.activeDeck.cards = state.activeDeck.cards?.map(
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
      })
      .addCase(removeCard.fulfilled, (state: DeckState, action: PayloadAction<Card>) => {
        state.activeDeck.cards = state.activeDeck.cards?.filter(
          (card: Card) => card.id !== action.payload.id,
        );

        state.allDecks = state.allDecks.map(
          (deck: Deck) => (deck.id === action.payload.deckId
            ? { ...deck, cards: deck.cards?.filter((card: any) => card.id !== action.payload.id) }
            : deck),
        );
      });
  },
});

export const { setActive } = deckSlice.actions;

export default deckSlice.reducer;
