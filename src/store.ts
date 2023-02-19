import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./reducers/usersReducer";
import deckReducer from "./reducers/deckReducer";

const store = configureStore({
  reducer: {
    user: usersReducer,
    decks: deckReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
