"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { generateColors } from "./generateColors";

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
          backgroundColor: generateColors(labels.length),
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
