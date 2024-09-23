import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientTealBlue } from "@visx/gradient";
import { scaleBand, scaleLinear } from "@visx/scale";

const verticalMargin = 120;

export type BarsProps = {
  data: number[];
  labels: string[];
  width: number;
  height: number;
  events?: boolean;
};

export default function Example({ width, height, labels, data }: BarsProps) {
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
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
        domain: [0, Math.max(...data)],
      }),
    [yMax]
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {data.map((d, i) => {
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(d) ?? 0);
          const barX = xScale(labels[i]);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${labels[i]}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
            />
          );
        })}
      </Group>
    </svg>
  );
}
