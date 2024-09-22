"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  title: string;
}

const DoughnutChart = ({ labels, data, title }: DoughnutChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chartProps = {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
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
          data: chartProps,
        });

        return () => {
          chart.destroy();
        };
      }
    }
  }, []);

  return <canvas ref={chartRef} id="acquisitions" className="w-full h-full" />;
};

export default DoughnutChart;
