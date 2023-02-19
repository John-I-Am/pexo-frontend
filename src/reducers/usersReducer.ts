/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import { NewUser, UserCredentials } from "../types";

const userSlice = createSlice({
  name: "users",
  initialState: {
    token: "",
    id: "",
    info: {
      name: "",
      surname: "",
      email: "",
    },
  },
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    setUserInfo(state, action) {
      state.info = action.payload;
    },
    clearUser() {
      window.localStorage.clear();
    },
  },
});

export const { setUser, setUserInfo, clearUser } = userSlice.actions;

export const registerUser = (
  newUser: NewUser,
) => async (): Promise<void> => {
  try {
    await userService.register(newUser);
  } catch (e: any) {
    console.log(e);
    return (e.response.data.error);
  }
};

export const fetchUser = (
  token: string,
  id: string,
) => async (dispatch: any): Promise<any> => {
  try {
    const response = await userService.fetch(token, id);
    dispatch(setUserInfo(response));
  } catch (e: any) {
    console.log(e);
    return (e.response.data.error);
  }
};

export const loginUser = (
  credentials: UserCredentials,
) => async (dispatch: any): Promise<any> => {
  try {
    const response = await userService.login(credentials);
    window.localStorage.setItem("currentUser", JSON.stringify(response));
    dispatch(setUser(response));
    dispatch(fetchUser(response.token, response.userId));
  } catch (e: any) {
    console.log(e);
    return (e.response.data.error);
  }
};

export const updateUser = (
  token: any,
  userId: string,
  updatedUser: any,
) => async (dispatch: any): Promise<any> => {
  try {
    const response = await userService.update(token, userId, updatedUser);
    dispatch(setUserInfo(response));
  } catch (e: any) {
    console.log(e);
    return (e.response.data.error);
  }
};

export default userSlice.reducer;
