import { createSlice } from "@reduxjs/toolkit";

import { ICovidData, COVID } from "./actions";
import { getCovidDataReducer } from "./reducer";

export interface covidDataState {
  isLoading: boolean;
  data: ICovidData[] | null;
  error: string | null;
}

const initialState: covidDataState = {
  isLoading: false,
  data: null,
  error: null,
};

export const { reducer: covidData } = createSlice({
  name: `${COVID}/covid-data`,
  initialState,
  reducers: {},
  extraReducers(builder) {
    getCovidDataReducer(builder);
  },
});
