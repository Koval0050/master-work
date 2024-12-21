import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectorCovidDataState = (state: RootState) => state.covidData;

export const selectorCovidDataData = createSelector(
  selectorCovidDataState,
  (CovidDataState) => CovidDataState.data,
);

export const selectorCovidDataIsLoading = createSelector(
  selectorCovidDataState,
  (CovidDataState) => CovidDataState.isLoading,
);

export const selectorCovidDataError = createSelector(
  selectorCovidDataState,
  (CovidDataState) => CovidDataState.error,
);
