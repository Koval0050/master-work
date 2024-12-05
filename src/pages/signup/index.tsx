import React, { useEffect } from "react";
import * as echarts from "echarts";
import Link from "next/link";

const SignUpPage = () => {
  useEffect(() => {
    // Ініціалізація графіка
    const chartDom = document.getElementById("chart");
    const myChart = echarts.init(chartDom);

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

  return (
    <div className="flex h-screen bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300 xl:flex-row">
      {/* Права частина з графіком */}
      <div className="hidden w-full items-center justify-center bg-gray-200 lg:w-1/2 xl:flex">
        <div
          id="chart"
          className="bg-white h-4/5 w-4/5 rounded-lg p-4 lg:h-3/5 lg:w-4/5"></div>
      </div>

      {/* Ліва частина з формою */}
      <div className="bg-white flex h-full w-full flex-col items-center justify-center px-10 shadow-lg xl:w-1/2">
        <h2 className="mb-6 text-3xl font-bold text-blue-700">Реєстрація</h2>
        <form className="w-full max-w-120 lg:w-1/2">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Ім'я користувача
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введіть ваше ім'я користувача"
            />
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
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введіть вашу електронну адресу"
            />
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
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введіть ваш пароль"
            />
          </div>
          <button
            type="submit"
            className="text-white w-full rounded-lg bg-blue-500 py-2 text-lg hover:bg-blue-600 hover:text-white-base">
            Зареєструватися
          </button>

          <div className="mt-4 flex gap-x-4 justify-center">
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
