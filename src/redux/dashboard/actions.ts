import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IData {
  date: number; // Відформатована дата (YYYYMMDD)
  state: string; // Код штату
  positive: number; // Кількість позитивних випадків
  negative: number; // Кількість негативних тестів
  totalTestResults: number; // Загальна кількість результатів тестів
  hospitalizedCurrently: number; // Кількість госпіталізованих на даний момент
  recovered: number; // Кількість одужавших
  death: number; // Кількість смертей
}

export interface ICovidData {
  _id: string;
  fileName: string; // Ім'я файлу
  uploadedAt: string; // Час завантаження
  data: IData[]; // Масив даних по COVID-19
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const COVID = "covid";

export const getCovidData = createAsyncThunk(
  `${COVID}/covid-data`,
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      // Робимо запит до API
      const { data } = await axios.get<ICovidData[] | null>(
        `${API_URL}/covid-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Додаємо токен до заголовків
          },
        },
      );

      // Перевірка, чи повернуто масив
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format: expected an array");
      }

      // Якщо дані порожні, повертаємо порожній масив
      return data.length > 0 ? data : [];
    } catch (error: any) {
      // Перевіряємо на 404 помилку
      if (error.response?.status === 404) {
        return []; // Якщо немає файлів, повертаємо порожній масив
      }
      const errorText = error.response?.data?.error || "Unknown error occurred";
      return rejectWithValue(errorText); // Обробляємо помилки
    }
  },
);


export const postCovidDataFile = async ({
  token,
  file,
}: {
  token: string;
  file: File;
}) => {
  try {
    const formData = new FormData();
    formData.append("file", file); // Додаємо файл до форми

    const { data } = await axios.post(`${API_URL}/upload-file`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Додаємо токен до заголовків
        "Content-Type": "multipart/form-data", // Встановлюємо тип контенту для завантаження файлів
      },
    });

    return data; // Повертаємо відповідь від сервера
  } catch (error) {
    console.error("Помилка завантаження файлу", error);
    throw error; // Кидаємо помилку для обробки на рівні виклику функції
  }
};

export const deleteCovidDataFile = async ({
  token,
  fileId,
}: {
  token: string;
  fileId: string;
}) => {
  try {
    const { data } = await axios.delete(`${API_URL}/delete-file/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Додаємо токен до заголовків
      },
    });

    return data; // Повертаємо відповідь від сервера
  } catch (error) {
    console.error("Помилка видалення файлу", error);
    throw error; // Кидаємо помилку для обробки на рівні виклику функції
  }
};


// const updatedate = () => () => {
//   return apipost().then(() => {
//     return get
//   }).catch((err) => {
//   console.error()
//   })
// }
