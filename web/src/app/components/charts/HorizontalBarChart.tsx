import { GradientPinkRed } from "@visx/gradient";
import { useParentSize } from "@visx/responsive";
import { BarGroupHorizontal } from "@visx/shape";
import { Scale } from "@visx/visx";

export type HorizontalBarChartProps = {
  data: number[];
  labels: string[];
};

const HorizontalBarChart = ({ labels, data }: HorizontalBarChartProps) => {
  const { parentRef, width, height } = useParentSize({ debounceTime: 150 });

  const minX = Math.min(...data);
  const maxX = Math.max(...data);

  const xScale = Scale.scaleLinear({
    domain: [minX, maxX], // x-coordinate data values
    range: [0, width], // svg x-coordinates, svg x-coordinates increase left to right
    round: true,
  });

  const yScale = Scale.scaleBand({
    domain: labels,
    padding: 0.2,
  });

  return (
    <div ref={parentRef}>
      <svg width={500} height={500}>
        <GradientPinkRed id={"1"} />
        <BarGroupHorizontal
          y0={(label) => label}
          keys={labels}
          data={[]}
          color={() => "rgba(23, 233, 217, .5)"}
          xScale={xScale}
          y0Scale={yScale}
          y1Scale={yScale}
          width={0}
        ></BarGroupHorizontal>
      </svg>
    </div>
  );
};

export default HorizontalBarChart;
