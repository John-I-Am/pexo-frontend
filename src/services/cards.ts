import axios from "axios";
import { Card, NewCard } from "../types";

const getAll = async (token: string): Promise<void> => {
  const config: any = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.get("/api/cards", config);
  return response.data;
};

const create = async (token: string, newCard: NewCard): Promise<void> => {
  const config: any = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.post("/api/cards", newCard, config);
  return response.data;
};

const update = async (token: string, updatedValues: any, cardId: any): Promise<void> => {
  const config: any = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.put(`/api/cards/${cardId}`, updatedValues, config);
  return response.data;
};

const remove = async (token: string, cardToDelete: Card): Promise<void> => {
  const config: any = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.delete(`/api/cards/${cardToDelete.id}`, config);
  return response.data;
};

export default {
  getAll, create, update, remove,
};
