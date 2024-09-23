"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartProps } from "./PieChart";

const BarChart = ({ labels, data, title }: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        const chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: title,
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        return () => {
          chart.destroy();
        };
      }
    }
  }, []);

  return <canvas ref={chartRef} id="acquisitions" />;
};

export default BarChart;
