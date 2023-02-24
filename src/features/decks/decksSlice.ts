/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

type SliceStatus = "idle" | "loading" | "succeeded" | "failed"

interface DeckState {
  activeDeckId: number | null;
  status: SliceStatus;
}

const deckSlice = createSlice({
  name: "decks",
  initialState: {
    activeDeckId: null,
    status: "idle" as SliceStatus,
  } as DeckState,
  reducers: {
    setActive(state: DeckState, action: any) {
      state.activeDeckId = action.payload;
    },
  },
});

export const { setActive } = deckSlice.actions;

export default deckSlice.reducer;
