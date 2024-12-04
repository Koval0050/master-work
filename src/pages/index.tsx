import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

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

  // Simulated fetch function to get Covid data
  useEffect(() => {
    // Replace this with an actual API call to fetch data
    const fetchData = async () => {
      // Mocked data for illustration
      const data: CovidData[] = [
        {
          date: 20240101,
          state: "CA",
          positive: 5030,
          negative: 4000,
          totalTestResults: 9000,
          hospitalizedCurrently: 200,
          recovered: 4500,
          death: 100,
        },
        {
          date: 20240102,
          state: "TX",
          positive: 3060,
          negative: 2500,
          totalTestResults: 5500,
          hospitalizedCurrently: 150,
          recovered: 2700,
          death: 50,
        },
        {
          date: 20240103,
          state: "TX",
          positive: 3600,
          negative: 2500,
          totalTestResults: 7500,
          hospitalizedCurrently: 150,
          recovered: 2900,
          death: 50,
        },
        {
          date: 20240104,
          state: "NW",
          positive: 300,
          negative: 250,
          totalTestResults: 500,
          hospitalizedCurrently: 150,
          recovered: 200,
          death: 0,
        },
        {
          date: 20240105,
          state: "FX",
          positive: 300,
          negative: 250,
          totalTestResults: 6500,
          hospitalizedCurrently: 190,
          recovered: 2790,
          death: 500,
        },
        // Add more states data here
      ];
      setCovidData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (covidData.length === 0) return;

    const chart = echarts.init(chartRef.current);

    const states = [...new Set(covidData.map((data) => data.state))]; // Get unique states
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
