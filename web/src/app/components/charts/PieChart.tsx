"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { generateColors } from "./generateColors";

export interface ChartProps {
  labels: string[];
  data: number[];
  title: string;
}

function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace("#", "");

  let bigint;
  if (hex.length === 3) {
    bigint = parseInt(
      hex
        .split("")
        .map((c) => c + c)
        .join(""),
      16
    );
  } else if (hex.length === 6) {
    bigint = parseInt(hex, 16);
  } else {
    throw new Error("Invalid HEX color format.");
  }

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const PieChart = ({ labels, data, title }: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const colors = generateColors(labels.length);

  useEffect(() => {
    const chartProps = {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: colors.map((color) => hexToRgba(color, 0.3)),
          borderColor: colors.map((color) => hexToRgba(color, 0.8)),
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    };

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        const chart = new Chart(ctx, {
          type: "pie",
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

export default PieChart;
