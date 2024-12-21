import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as echarts from "echarts";
import { useAppDispatch } from "@/hooks/redux";
import { postSignIn } from "@/redux/singin/actions";
import { ISignInData } from "@/redux/singin/actions";

const Home = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  // Перевірка токена в localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard"); // Перенаправлення на Dashboard, якщо токен є
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInData>();

  // Обробник сабміту
  const onSubmit = async (data: ISignInData) => {
    try {
      // Викликаємо екшен
      const response = await dispatch(postSignIn(data)).unwrap();
      console.log(response);

      if (response.token) {
        // Збереження токена в localStorage
        localStorage.setItem("token", response.token);

        // Перенаправлення на сторінку Dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Якщо помилка з Axios
        console.error(
          "Помилка авторизації:",
          error.response?.data || error.message,
        );
        alert(
          error.response?.data?.message || "Не вдалося виконати авторизацію",
        );
      } else {
        // Інші типи помилок
        console.error("Невідома помилка:", error);
        alert("Сталася невідома помилка");
      }
    }
  };

  useEffect(() => {
    // Ініціалізація графіка
    const chartDom = document.getElementById("chart");
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: "Дані про використання",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Категорії",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Категорія A" },
            { value: 735, name: "Категорія B" },
            { value: 580, name: "Категорія C" },
            { value: 484, name: "Категорія D" },
            { value: 300, name: "Категорія E" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    myChart.setOption(option);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-gradient-to-r from-blue-100 to-blue-300 xl:flex-row">
      {/* Ліва частина з формою */}
      <div className="bg-white flex h-full w-full flex-col items-center justify-center px-10 shadow-lg xl:w-1/2">
        <h2 className="mb-6 text-3xl font-bold text-blue-700">Авторизація</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-120 lg:w-1/2">
          {/* Поле Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Це поле є обов'язковим",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Некоректний формат email",
                },
              })}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введіть вашу електронну адресу"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Поле Пароль */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Це поле є обов'язковим",
                minLength: {
                  value: 6,
                  message: "Пароль має містити мінімум 6 символів",
                },
              })}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введіть ваш пароль"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Кнопка Увійти */}
          <button
            type="submit"
            className="text-white w-full rounded-lg bg-blue-500 py-2 text-lg hover:bg-blue-600 hover:text-white-base">
            Увійти
          </button>

          {/* Посилання на реєстрацію */}
          <div className="mt-4 flex justify-center gap-x-4">
            <p>Немає акаунту?</p>
            <Link
              href={"/signup"}
              className="text-blue-700 transition-all hover:font-semibold hover:underline">
              Зареєструватися
            </Link>
          </div>
        </form>
      </div>

      {/* Права частина з графіком */}
      <div className="hidden w-full items-center justify-center lg:w-1/2 xl:flex">
        <div
          id="chart"
          className="bg-white h-4/5 w-4/5 rounded-lg p-4 lg:h-3/5 lg:w-4/5"></div>
      </div>
    </div>
  );
};

export default Home;
