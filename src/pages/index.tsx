// src/pages/Home.jsx

import React, { useEffect } from "react";
import * as echarts from "echarts";
import Link from "next/link";

const Home = () => {
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
        <form className="w-full max-w-120 lg:w-1/2">
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
            Увійти
          </button>

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
