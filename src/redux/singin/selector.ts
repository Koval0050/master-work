import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectorSignInState = (state: RootState) => state.signin;

export const selectorSignInData = createSelector(
  selectorSignInState,
  (signInState) => signInState.data,
);

export const selectorSignInIsLoading = createSelector(
  selectorSignInState,
  (signInState) => signInState.isLoading,
);

export const selectorSignInError = createSelector(
  selectorSignInState,
  (signInState) => signInState.error,
);
