import axios from "axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
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

export const register = async (
  data: RegisterData,
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/auth/register`,
      data,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Помилка реєстрації. Спробуйте пізніше.",
      );
    }
    throw new Error("Невідома помилка.");
  }
};
