import { useParentSize } from "@visx/responsive";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { useMemo } from "react";
import { Text } from "@visx/text";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { formatLabel } from "./formatLabel";

export type HorizontalBarChartProps = {
  counts: number[];
  labels: string[];
  columns?: number;
};

type TooltipData = number;

const HorizontalBarChart = ({
  counts,
  labels,
  columns = 1,
}: HorizontalBarChartProps) => {
  const { parentRef, width, height } = useParentSize({ debounceTime: 500 });

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  });

  // margin
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const gap = 16;

  const sum = counts.reduce((sum, num) => sum + num);

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
    tooltipOpen: false,
    tooltipLeft: 0,
    tooltipTop: 0,
    tooltipData: 0,
  });

  return (
    <div ref={parentRef} className="w-full h-full min-w-0 min-h-0">
      <svg width={width} height={height} ref={containerRef}>
        <rect width={width} height={height} fill="#f5f5f5" rx={14} />
        <Group top={margin.top} left={margin.left}>
          {labels.map((label, index) => {
            const barHeight = xScale.bandwidth();
            const barWidth = (yMax - (yScale(counts[index]) ?? 0)) * columns;
            const barY = xScale(labels[index]) ?? 0;
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
                    hideTooltip();
                  }}
                  onMouseMove={() => {
                    const top = barY;
                    const left = barX;
                    showTooltip({
                      tooltipData: counts[index],
                      tooltipTop: top,
                      tooltipLeft: left,
                    });
                  }}
                />
                <Text
                  x={barX + barWidth / 2} // Position text 5px to the right of the bar
                  y={(barY ?? 0) + barHeight / 2} // Center the text vertically
                  verticalAnchor="middle"
                  textAnchor="middle"
                  fill="#000"
                  fontFamily="Inter, sans-serif"
                  fontSize={14}
                >
                  {`${((counts[index] / sum) * 100).toFixed(0)}%`}
                </Text>
                <Text
                  x={barX + barWidth + gap} // Position text 5px to the right of the bar
                  y={(barY ?? 0) + barHeight / 2} // Center the text vertically
                  verticalAnchor="middle"
                  fill="#000"
                  fontFamily="Inter, sans-serif"
                  fontSize={14}
                >
                  {formatLabel(label)}
                </Text>
              </Group>
            );
          })}
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={defaultStyles}
        >
          <div>{tooltipData}</div>
        </TooltipInPortal>
      )}
    </div>
  );
};

export default HorizontalBarChart;
