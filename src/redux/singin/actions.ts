import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ISignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Отримання базового URL з оточення
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AUTH = "auth";

export const postSignIn = createAsyncThunk(
  `${AUTH}/login`,
  async (credentials: ISignInData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<SignInResponse>(
        `${API_URL}/auth/login`,
        credentials,
      );

      return data;
    } catch ({ response }: any) {
      const errorText = response?.data?.error;

      return rejectWithValue(errorText);
    }
  },
);
