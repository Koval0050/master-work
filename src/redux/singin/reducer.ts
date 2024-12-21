import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import {  SignInResponse } from "./actions";
import { signinState } from "./slice";
import { postSignIn } from "./actions";

type ActionReducerMapBuilderWithSignInState =
  ActionReducerMapBuilder<signinState>;

export const postSignInReducer = (
  builder: ActionReducerMapBuilderWithSignInState,
) => {
  builder.addCase(postSignIn.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(
    postSignIn.fulfilled,
    (state, action: PayloadAction<SignInResponse>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
  );

  builder.addCase(postSignIn.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload as string | null;
  });
};
