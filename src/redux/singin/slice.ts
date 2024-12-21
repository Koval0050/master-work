import { createSlice } from "@reduxjs/toolkit";
import { ISignInData, SignInResponse } from "./actions";
import { AUTH } from "./actions";
import { postSignInReducer } from "./reducer";

export interface signinState {
  isLoading: boolean;
  data: SignInResponse | null;
  error: string | null;
}

const initialState: signinState = {
  isLoading: false,
  data: null,
  error: null,
};

export const { reducer: signin } = createSlice({
  name: `${AUTH}/login`,
  initialState,
  reducers: {},
  extraReducers(builder) {
    postSignInReducer(builder);
  },
});
