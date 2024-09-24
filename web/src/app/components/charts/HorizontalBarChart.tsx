import { GradientPinkRed, GradientTealBlue } from "@visx/gradient";
import { useParentSize } from "@visx/responsive";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { useMemo } from "react";
import { scaleBand, scaleLinear } from "@visx/scale";

export type HorizontalBarChartProps = {
  counts: number[];
  labels: string[];
};

const HorizontalBarChart = ({ counts, labels }: HorizontalBarChartProps) => {
  const { parentRef, width, height } = useParentSize({ debounceTime: 150 });

  // margin
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, yMax],
        round: true,
        domain: labels,
        padding: 0.4,
      }),
    [xMax]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...counts)],
      }),
    [yMax]
  );

  return (
    <div ref={parentRef} className="w-full h-full">
      <svg width={width} height={height}>
        <rect width={width} height={height} fill="#cbd5e1" rx={14} />
        <Group top={margin.top} left={margin.left}>
          {labels.map((label, index) => {
            const barHeight = xScale.bandwidth();
            const barWidth = yMax - (yScale(counts[index]) ?? 0);
            const barY = xScale(labels[index]);
            const barX = margin.left;
            return (
              <Bar
                key={`bar-${labels[index]}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="#6366f1"
              />
            );
          })}
        </Group>
      </svg>
    </div>
  );
};

export default HorizontalBarChart;
