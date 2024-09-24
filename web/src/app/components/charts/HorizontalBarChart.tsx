import { GradientPinkRed } from "@visx/gradient";
import { useParentSize } from "@visx/responsive";

const HorizontalBarChart = () => {
  const { parentRef, width, height } = useParentSize({ debounceTime: 150 });
  return (
    <div ref={parentRef}>
      <svg width={width} height={height}>
        <GradientPinkRed id={"1"} />
      </svg>
    </div>
  );
};

export default HorizontalBarChart;
