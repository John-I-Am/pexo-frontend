import axios from "axios";
import { Deck } from "../types";

const getAll = async (token: string): Promise<Deck[]> => {
  const config: any = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.get("/api/decks", config);
  return response.data;
};

const create = async (token: string): Promise<Deck> => {
  const config: any = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.post("/api/decks", {}, config);
  return response.data;
};

const update = async (token: string, updatedDeck: Deck): Promise<Deck> => {
  const config: any = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.put(`/api/decks/${updatedDeck.id}`, updatedDeck, config);
  return response.data;
};

const remove = async (token: string, deckToDelete: Deck): Promise<void> => {
  const config: any = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.delete(`/api/decks/${deckToDelete.id}`, config);
  return response.data;
};

export default {
  getAll, create, update, remove,
};
