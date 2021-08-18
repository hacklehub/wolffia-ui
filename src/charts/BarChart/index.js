import React from "react";

import { scaleLinear } from "d3-scale";
import { max } from "d3";

const BarChart = ({
  data = [],
  id,
  className,
  width = 490,
  height = 200,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingTop = 0,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  referenceLines = [],
  x,
  y,
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    svg.selectAll("*").remove();

    const xFn = scaleLinear()
      .domain([
        Number.isFinite(x.start) ? x.start : min(data.map(d => d[x.key])),
        Number.isFinite(x.end) ? x.end : max(data.map(d => d[x.key])),
      ])
      .range([marginLeft + paddingLeft, width + marginLeft]);

    const xAxis =
      x.axis === "top"
        ? axisTop(xFn).ticks(x.axisTicks || 5)
        : axisBottom(xFn).ticks(x.axisTicks || 5);

    const g = svg.append("g");
  };

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll(".tooltip").remove();
    };
  }, [props]);

  return (
    <svg
      id={id}
      className={`${className}`}
      width={width + marginLeft + marginRight}
      height={height + marginTop + marginBottom}
    />
  );
};

export default BarChart;
