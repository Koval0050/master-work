import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectorRegisterState = (state: RootState) => state.register;

export const selectorRegister = createSelector(
  selectorRegisterState,
  (RegisterState) => RegisterState.data,
);

export const selectorRegisterIsLoading = createSelector(
  selectorRegisterState,
  (RegisterState) => RegisterState.isLoading,
);
