import { createSlice } from "@reduxjs/toolkit";

import { IRegisterData } from "./actions";
import { AUTH } from "./actions";
import { postRegisterReducer } from "./reducer";

export interface registerState {
  isLoading: boolean;
  data: IRegisterData | null;
}

const initialState: registerState = {
  isLoading: false,
  data: null,
};

export const { reducer: register } = createSlice({
  name: AUTH,
  initialState,
  reducers: {},
  extraReducers(builder) {
    postRegisterReducer(builder);
  },
});
