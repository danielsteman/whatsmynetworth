"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const data = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        const chart = new Chart(ctx, {
          type: "doughnut",
          data: data,
        });

        return () => {
          chart.destroy();
        };
      }
    }
  }, []);

  return <canvas ref={chartRef} id="acquisitions" />;
};

export default DoughnutChart;
