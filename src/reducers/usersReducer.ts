/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userService from "../services/users";
import { NewUser, UserCredentials } from "../types";

type SliceStatus = "idle" | "loading" | "succeeded" | "failed"

interface UserState {
  token: string;
  id: string;
  info: {
    name: string,
    surname: string,
    email: string,
  };
  status: SliceStatus;
}

export const updateUser = createAsyncThunk("users/updateUser", async ({ token, userId, updatedUser }: {token: string, userId: string, updatedUser: any}): Promise<any> => {
  const response = await userService.update(token, userId, updatedUser);
  return response;
});

export const fetchUser = createAsyncThunk("users/fetchUser", async ({ token, id }: {token: string, id: string}): Promise<any> => {
  const response = await userService.fetch(token, id);
  return response;
});

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: NewUser): Promise<any> => {
  const response = await userService.register(newUser);
  return response;
});

export const loginUser = createAsyncThunk("users/loginUser", async (credentials: UserCredentials): Promise<any> => {
  const response = await userService.login(credentials);
  window.localStorage.setItem("currentUser", JSON.stringify(response));
  return response;
});

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
  } as UserState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<any>) {
      state.token = action.payload.token;
      state.id = action.payload.userId;
    },
    clearUser() {
      window.localStorage.clear();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state: UserState, action: any) => {
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.info = action.payload;
      })
      .addCase(loginUser.rejected, (state: UserState) => {
        state.status = "failed";
      })
      .addCase(fetchUser.fulfilled, (state: UserState, action: any) => {
        state.info = action.payload;
      })
      .addCase(updateUser.fulfilled, (state: UserState, action: any) => {
        state.info = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
