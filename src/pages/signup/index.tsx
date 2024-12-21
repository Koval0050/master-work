import React, { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { useForm } from "react-hook-form";
import * as echarts from "echarts";
import Link from "next/link";
import { postRegister } from "@/redux/singup/actions";
import { useRouter } from "next/router";
import { IRegisterData } from "@/redux/singup/actions";

const SignUpPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Перевірка токена в localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard"); // Перенаправлення на Dashboard, якщо токен є
    }
  }, [router]);

  useEffect(() => {
    // Ініціалізація графіка
    const chartDom = document.getElementById("chart");
    const myChart = echarts.init(chartDom!);

    const option = {
      title: {
        text: "Активність користувачів",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
        },
      ],
    };

    myChart.setOption(option);
  }, []);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterData>();

  const onSubmit = async (data: IRegisterData) => {
    try {
      const response = await dispatch(postRegister(data)).unwrap();

      // Редірект на сторінку Авторизації
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "Не вдалося зареєструватися. Спробуйте ще раз.");
      } else {
        alert("Не вдалося зареєструватися. Спробуйте ще раз.");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300 xl:flex-row">
      {/* Ліва частина з графіком */}
      <div className="hidden w-full items-center justify-center lg:w-1/2 xl:flex">
        <div
          id="chart"
          className="bg-white h-4/5 w-4/5 rounded-lg p-4 lg:h-3/5 lg:w-4/5"></div>
      </div>

      {/* Права частина з формою */}
      <div className="bg-white flex h-full w-full flex-col items-center justify-center px-10 shadow-lg xl:w-1/2">
        <h2 className="mb-6 text-3xl font-bold text-blue-700">Реєстрація</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-120 lg:w-1/2">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Ім'я користувача
            </label>
            <input
              type="text"
              id="name"
              {...formRegister("name", { required: "Це поле є обов'язковим" })}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введіть ваше ім'я користувача"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...formRegister("email", {
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

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              {...formRegister("password", {
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

          <button
            type="submit"
            className="text-white w-full rounded-lg bg-blue-500 py-2 text-lg hover:bg-blue-600 hover:text-white-base">
            Зареєструватися
          </button>

          <div className="mt-4 flex justify-center gap-x-4">
            <p>Уже є акаунт?</p>
            <Link
              href={"/"}
              className="text-blue-700 transition-all hover:font-semibold hover:underline">
              Авторизуватися
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
