import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useAppSelector } from "@/hooks/redux";
import { selectorCovidDataData } from "@/redux/dashboard/selector";

interface DashboardProps {
  id: string; // Проп для id
}

const Dashboard: React.FC<DashboardProps> = ({ id }) => {
  const covidData = useAppSelector(selectorCovidDataData); // Отримуємо дані через селектор
  const chartRef = useRef(null);
  const [startDate, setStartDate] = useState<string>(""); // Початкова дата
  const [endDate, setEndDate] = useState<string>(""); // Кінцева дата
  const [minPositiveCases, setMinPositiveCases] = useState<number>(0); // Мінімальна кількість позитивних випадків
  const [maxPositiveCases, setMaxPositiveCases] = useState<number>(0); // Максимальна кількість позитивних випадків
  const [minHospitalized, setMinHospitalized] = useState<number>(0); // Мінімальна кількість госпіталізованих

  // Фільтруємо дані за переданим id
  const filteredData = covidData?.find((data) => data._id === id);

  // Функція для скидання фільтрів
  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setMinPositiveCases(0);
    setMaxPositiveCases(0);
    setMinHospitalized(0);
  };

  // Функція для форматування дати
  const formatDate = (date: number): string => {
    const dateStr = date.toString(); // Перетворюємо в рядок
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!filteredData || !chartRef.current) return; // Якщо немає даних, нічого не робимо

    const chart = echarts.init(chartRef.current);

    const filteredChartData = filteredData.data
      .filter(
        (record) =>
          (!startDate ||
            new Date(formatDate(record.date)) >= new Date(startDate)) && // Фільтр за початковою датою
          (!endDate || new Date(formatDate(record.date)) <= new Date(endDate)), // Фільтр за кінцевою датою
      )
      .filter((record) => record.positive >= minPositiveCases) // Фільтр за позитивними випадками
      .filter(
        (record) => !maxPositiveCases || record.positive <= maxPositiveCases,
      )
      .filter((record) => record.hospitalizedCurrently >= minHospitalized); // Фільтр за госпіталізованими

    const chartOptions = {
      tooltip: {
        trigger: "axis",
        formatter: (params: any) =>
          params
            .map((item: any) => `${item.seriesName}: ${item.value}`)
            .join("<br/>"),
      },
      legend: {
        data: [
          "Positive Cases",
          "Negative Cases",
          "Hospitalized",
          "Deaths",
          "Recovered",
        ],
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar", "stack"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      dataZoom: [
        {
          type: "slider",
          start: 0,
          end: 100,
        },
        {
          type: "inside",
          start: 0,
          end: 100,
        },
      ],
      xAxis: [
        {
          type: "category",
          data: filteredChartData.map(
            (data) => `Date: ${formatDate(data.date)}`,
          ), // Форматуємо дату
        },
      ],
      yAxis: [{ type: "value" }],
      series: [
        {
          name: "Positive Cases",
          type: "bar",
          data: filteredChartData.map((data) => data.positive),
        },
        {
          name: "Negative Cases",
          type: "bar",
          data: filteredChartData.map((data) => data.negative),
        },
        {
          name: "Hospitalized",
          type: "bar",
          data: filteredChartData.map((data) => data.hospitalizedCurrently),
        },
        {
          name: "Deaths",
          type: "bar",
          data: filteredChartData.map((data) => data.death),
        },
        {
          name: "Recovered",
          type: "bar",
          data: filteredChartData.map((data) => data.recovered),
        },
      ],
      grid: {
        bottom: "3%",
        containLabel: true,
        left: "3%",
      },
    };

    chart.setOption(chartOptions);

    return () => chart.dispose();
  }, [
    filteredData,
    startDate,
    endDate,
    minPositiveCases,
    maxPositiveCases,
    minHospitalized,
  ]);

  if (!covidData || covidData.length === 0) {
    return <div className="text-center text-xl">Оберіть файл</div>;
  }

  if (!filteredData) {
    return (
      <div className="text-center text-xl">Дані для цього ID відсутні</div>
    );
  }

  return (
    <div className="w-full max-w-[70%] px-5">
      <h1 className="mb-4 w-full pt-3 text-center text-3xl">
        COVID-19 Data Visualization
      </h1>

      {/* Фільтри */}
      <div className="mb-4 flex flex-wrap gap-4">
        {/* Фільтр за датою */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <label htmlFor="start-date" className="mb-1 font-medium">
              Start Date:
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded border px-4 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="end-date" className="mb-1 font-medium">
              End Date:
            </label>

            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded border px-4 py-2"
            />
          </div>
        </div>

        {/* Фільтр за позитивними випадками */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="min-positive" className="mb-1 font-medium">
              Min Positive Cases:
            </label>
            <input
              id="min-positive"
              type="number"
              value={minPositiveCases}
              onChange={(e) => setMinPositiveCases(Number(e.target.value))}
              className="rounded border px-4 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="max-positive" className="mb-1 font-medium">
              Max Positive Cases:
            </label>
            <input
              id="max-positive"
              type="number"
              value={maxPositiveCases}
              onChange={(e) => setMaxPositiveCases(Number(e.target.value))}
              className="rounded border px-4 py-2"
            />
          </div>
        </div>

        {/* Фільтр за госпіталізованими */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="min-hispitalized">
            Min Hospitalized
          </label>
          <input
            id="min-hispitalized"
            type="number"
            value={minHospitalized}
            onChange={(e) => setMinHospitalized(Number(e.target.value))}
            className="border px-4 py-2"
            placeholder="Min Hospitalized"
          />
        </div>
      </div>

      {/* Кнопка для скидання фільтрів */}
      <button
        onClick={resetFilters}
        className="text-white mt-4 rounded bg-red-500 px-4 py-2 hover:bg-red-600">
        Скинути фільтри
      </button>

      {/* Графік */}
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "400px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      />
    </div>
  );
};

export default Dashboard;
