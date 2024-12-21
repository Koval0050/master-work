import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { ICovidData, getCovidData } from "./actions";
import { covidDataState } from "./slice";

type ActionReducerMapBuilderWithCovidDataState =
  ActionReducerMapBuilder<covidDataState>;

export const getCovidDataReducer = (
  builder: ActionReducerMapBuilderWithCovidDataState,
) => {
  builder.addCase(getCovidData.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(
    getCovidData.fulfilled,
    (state, action: PayloadAction<ICovidData[]>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
  );

  

  builder.addCase(getCovidData.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload as string | null;
  });
};
