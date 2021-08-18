import React, { useEffect } from "react";

import { scaleLinear } from "d3-scale";
import { select, selectAll, pointer } from "d3-selection";

const BulletChart = props => {
  const {
    id,
    className,
    data = 0,
    label = "",
    min,
    base,
    target,
    threshold,
    max,
    width = 400,
    labelWidth = 100,
    height = 50,
  } = props;

  const refreshChart = async () => {
    const svg = select(`#${id}`);
    // Clear svg

    svg.selectAll("*").remove();

    const xFn = scaleLinear().domain([min, max]).range([labelWidth, width]);

    const g = svg.append("g");

    g.append("text")
      .text(label)
      .attr("x", 10)
      .attr("y", height - 5);
  };

  useEffect(() => {
    console.log("Here");
    refreshChart();
    return () => {
      selectAll(".tooltip").remove();
    };
  }, [props]);

  return (
    <svg
      id={id}
      className={`${className || ""}`}
      width={width}
      height={height}
    />
  );
};

export default BulletChart;
