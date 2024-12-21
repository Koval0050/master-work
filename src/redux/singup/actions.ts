import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

// Отримання базового URL з оточення
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AUTH = "auth";

export const postRegister = createAsyncThunk(
  `${AUTH}/register`,
  async (register: IRegisterData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<IRegisterData>(
        `${API_URL}/auth/register`,
        register,
      );

      return data;
    } catch ({ response }: any) {
      const errorText = response?.data?.error;

      return rejectWithValue(errorText);
    }
  },
);
