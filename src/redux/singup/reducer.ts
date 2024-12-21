import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import { IRegisterData } from "./actions";
import { registerState } from "./slice";
import { postRegister } from "./actions";

type ActionReducerMapBuilderWithRegisterState =
  ActionReducerMapBuilder<registerState>;

export const postRegisterReducer = (
  builder: ActionReducerMapBuilderWithRegisterState,
) => {
  builder.addCase(postRegister.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(
    postRegister.fulfilled,
    (state, action: PayloadAction<IRegisterData>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
  );

  builder.addCase(postRegister.rejected, (state) => {
    state.isLoading = false;
    state.data = null;
  });
};
