import axios from "axios";

// Інтерфейси для запиту та відповіді
interface IAuthRequest {
  email: string;
  password: string;
}

interface IAuthResponse {
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

// Функція авторизації
export const login = async (data: IAuthRequest): Promise<IAuthResponse> => {
  try {
    const response = await axios.post<IAuthResponse>(
      `${API_URL}/auth/login`, // Використання базового URL
      data,
    );
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Не вдалося виконати запит",
    );
  }
};
