import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { register } from "./singup/slice";
import { signin } from "./singin/slice";
import { covidData } from "./dashboard/slice";

export const store = configureStore({
  reducer: combineReducers({ register, signin, covidData }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
