import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { fetchCovidData } from "@/api";

interface CovidData {
  date: number; // Відформатована дата (YYYYMMDD)
  state: string; // Код штату
  positive: number; // Кількість позитивних випадків
  negative: number; // Кількість негативних тестів
  totalTestResults: number; // Загальна кількість результатів тестів
  hospitalizedCurrently: number; // Кількість госпіталізованих на даний момент
  recovered: number; // Кількість одужавших
  death: number; // Кількість смертей
}

const Home = () => {
  const chartRef = useRef(null);
  const [covidData, setCovidData] = useState<CovidData[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");

  // Завантажуємо дані лише один раз при монтуванні компонента
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCovidData(); // Отримуємо дані через API
        setCovidData(data); // Оновлюємо стан з отриманими даними
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };

    fetchData(); // Викликаємо функцію для отримання даних
  }, []); // Порожній масив залежностей, тому викликається тільки один раз при монтуванні компонента

  useEffect(() => {
    if (covidData.length === 0) return;

    const chart = echarts.init(chartRef.current);

    const states = [...new Set(covidData.map((data) => data.state))]; // Отримуємо унікальні штати
    const selectedStateData = covidData.filter(
      (data) => data.state === selectedState || selectedState === "",
    );

    const chartOptions = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
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
      xAxis: [
        {
          type: "category",
          data: selectedStateData.map((data) => `Date: ${data.date}`),
        },
      ],
      yAxis: [{ type: "value" }],
      series: [
        {
          name: "Positive Cases",
          type: "bar",
          data: selectedStateData.map((data) => data.positive),
        },
        {
          name: "Negative Cases",
          type: "bar",
          data: selectedStateData.map((data) => data.negative),
        },
        {
          name: "Hospitalized",
          type: "bar",
          data: selectedStateData.map((data) => data.hospitalizedCurrently),
        },
        {
          name: "Deaths",
          type: "bar",
          data: selectedStateData.map((data) => data.death),
        },
        {
          name: "Recovered",
          type: "bar",
          data: selectedStateData.map((data) => data.recovered),
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
  }, [covidData, selectedState]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>COVID-19 Data Visualization</h1>
      <div>
        <select
          onChange={(e) => setSelectedState(e.target.value)}
          value={selectedState}
          style={{ padding: "10px", marginBottom: "20px" }}>
          <option value="">Select State</option>
          {[...new Set(covidData.map((data) => data.state))].map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

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

export default Home;
