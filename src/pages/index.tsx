import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

const Home = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const posList = [
      "left",
      "right",
      "top",
      "bottom",
      "inside",
      "insideTop",
      "insideLeft",
      "insideRight",
      "insideBottom",
      "insideTopLeft",
      "insideTopRight",
      "insideBottomLeft",
      "insideBottomRight",
    ];

    // Налаштування параметрів
    const configParameters = {
      rotate: { min: -90, max: 90 },
      align: { options: { left: "left", center: "center", right: "right" } },
      verticalAlign: {
        options: { top: "top", middle: "middle", bottom: "bottom" },
      },
      position: {
        options: posList.reduce((map: { [key: string]: string }, pos) => {
          map[pos] = pos;
          return map;
        }, {}),
      },
      distance: { min: 0, max: 100 },
    };

    console.log(configParameters);

    const config = {
      rotate: 90,
      align: "left",
      verticalAlign: "middle",
      position: "insideBottom",
      distance: 15,
      onChange: function () {
        const labelOption = {
          rotate: config.rotate,
          align: config.align,
          verticalAlign: config.verticalAlign,
          position: config.position,
          distance: config.distance,
        };

        chart.setOption({
          series: [
            { label: labelOption },
            { label: labelOption },
            { label: labelOption },
            { label: labelOption },
          ],
        });
      },
    };

    const labelOption = {
      show: true,
      position: config.position,
      distance: config.distance,
      align: config.align,
      verticalAlign: config.verticalAlign,
      rotate: config.rotate,
      formatter: "{c}  {name|{a}}",
      fontSize: 16,
      rich: { name: {} },
    };

    // Ініціалізація графіку
    const chart = echarts.init(chartRef.current);

    // Опції для графіку
    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      legend: {
        data: ["Forest", "Steppe", "Desert", "Wetland"],
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
          axisTick: { show: false },
          data: ["2012", "2013", "2014", "2015", "2016"],
        },
      ],
      yAxis: [{ type: "value" }],
      series: [
        {
          name: "Forest",
          type: "bar",
          barGap: 0,
          label: labelOption,
          emphasis: { focus: "series" },
          data: [320, 332, 301, 334, 390],
        },
        {
          name: "Steppe",
          type: "bar",
          label: labelOption,
          emphasis: { focus: "series" },
          data: [220, 182, 191, 234, 290],
        },
        {
          name: "Desert",
          type: "bar",
          label: labelOption,
          emphasis: { focus: "series" },
          data: [150, 232, 201, 154, 190],
        },
        {
          name: "Wetland",
          type: "bar",
          label: labelOption,
          emphasis: { focus: "series" },
          data: [98, 77, 101, 99, 40],
        },
      ],
      grid: {
        bottom: "3%",
        containLabel: true,
        left: "3%",
      },
    };

    // Рендер графіку
    chart.setOption(options);

    // Очищення при розмонтуванні компонента
    return () => chart.dispose();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Interactive Bar Chart</h1>
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
