import { useParentSize } from "@visx/responsive";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { useMemo } from "react";
import { Text } from "@visx/text";
import { scaleBand, scaleLinear } from "@visx/scale";
import {
  Tooltip,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
  defaultStyles,
} from "@visx/tooltip";

export type HorizontalBarChartProps = {
  counts: number[];
  labels: string[];
  columns?: number;
};

type TooltipData = string;

let tooltipTimeout: number;

const HorizontalBarChart = ({
  counts,
  labels,
  columns = 1,
}: HorizontalBarChartProps) => {
  const { parentRef, width, height } = useParentSize({ debounceTime: 150 });

  // margin
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const gap = 16;

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

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<TooltipData>({
    // initial tooltip state
    tooltipOpen: true,
    tooltipLeft: width / 3,
    tooltipTop: height / 3,
    tooltipData: "Move me with your mouse or finger",
  });

  return (
    <div ref={parentRef} className="w-full h-full">
      <svg width={width} height={height}>
        <rect width={width} height={height} fill="#f5f5f5" rx={14} />
        <Group top={margin.top} left={margin.left}>
          {labels.map((label, index) => {
            const barHeight = xScale.bandwidth();
            const barWidth = (yMax - (yScale(counts[index]) ?? 0)) * columns;
            const barY = xScale(labels[index]);
            const barX = margin.left;
            return (
              <Group key={`bar-${label}`}>
                <Bar
                  key={`bar-${labels[index]}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="#2dd4bf"
                  onMouseLeave={() => {
                    tooltipTimeout = window.setTimeout(() => {
                      hideTooltip();
                    }, 300);
                  }}
                  // onMouseMove={() => {
                  //   if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  //   const top = barY + margin.top;
                  //   const left = bar.x + bar.width + margin.left;
                  //   showTooltip({
                  //     tooltipData: bar,
                  //     tooltipTop: top,
                  //     tooltipLeft: left,
                  //   });
                  // }}
                />
                <Text
                  x={barX + barWidth + gap} // Position text 5px to the right of the bar
                  y={(barY ?? 0) + barHeight / 2} // Center the text vertically
                  verticalAnchor="middle"
                  fill="#000"
                  fontFamily="Inter, sans-serif"
                  fontSize={14}
                >
                  {label}
                </Text>
              </Group>
            );
          })}
        </Group>
      </svg>
    </div>
  );
};

export default HorizontalBarChart;
