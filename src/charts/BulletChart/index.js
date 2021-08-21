import React, { useEffect } from "react";

import { scaleLinear } from "d3-scale";
import { axisBottom } from "d3-axis";
import { select, selectAll, pointer } from "d3-selection";

import { mergeTailwindClasses } from "../../utils";
const BulletChart = ({
  id,
  className,
  data = 0,
  classNameData = "text-blue-500",
  label = "",
  min = 0,
  classNameBase = "text-gray-400",
  base,
  classNameTarget = "text-black",
  target,
  threshold,
  classNameThreshold = `text-gray-300`,
  max,
  classNameMax = `text-gray-200`,
  marginLeft = 120,
  axisHeight = 20,
  height = 50,
  paddingTop = 10,
  paddingRight = 20,
}) => {
  const refreshChart = async () => {
    const svg = select(`#${id}`);

    svg.selectAll("*").remove();

    const width = +svg.style("width").split("px")[0];

    const xFn = scaleLinear()
      .domain([min, max])
      .range([0, width - marginLeft - paddingRight]);

    const g = svg.append("g");

    g.append("text")
      .text(label)
      .attr("class", `stroke-current ${className}`)
      .attr("text-anchor", "end")
      .attr("font-size", "0.8em")
      .attr("x", marginLeft - 10)
      .attr("y", height - axisHeight - 5);

    const bulletG = g
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`);

    bulletG
      .append("rect")
      .attr("class", `${classNameMax} fill-current`)
      .attr("x", xFn(min))
      .attr("y", 0)
      .attr("width", xFn(max))
      .attr("height", height - axisHeight);

    bulletG
      .append("rect")
      .attr("class", `${classNameThreshold} fill-current`)
      .attr("x", xFn(min))
      .attr("y", 0)
      .attr("width", xFn(threshold))
      .attr("height", height - axisHeight);

    bulletG
      .append("rect")
      .attr("class", `${classNameBase} fill-current`)
      .attr("x", xFn(min))
      .attr("y", 0)
      .attr("width", xFn(base))
      .attr("height", height - axisHeight);

    bulletG
      .append("line")
      .attr("y1", 5)
      .attr("y2", height - axisHeight - 5)
      .attr("x1", xFn(target))
      .attr("x2", xFn(target))
      .attr("class", `stroke-1 stroke-current ${classNameTarget}`);

    bulletG
      .append("rect")
      .attr("class", `${classNameData} fill-current`)
      .attr("x", xFn(min))
      .attr("y", paddingTop)
      .attr("width", 0)
      .attr("height", height - axisHeight - paddingTop * 2)
      .transition()
      .duration(1000)
      .attr("width", xFn(data));

    const xAxisG = g.append("g").attr("class", "axis--x axis ");

    const xAxis = axisBottom(xFn).ticks(5);

    xAxisG
      .attr("transform", `translate(${marginLeft}, ${height - axisHeight})`)
      .call(xAxis);
  };

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll(".tooltip").remove();
    };
  }, [
    data,
    min,
    base,
    target,
    threshold,
    classNameData,
    classNameTarget,
    classNameThreshold,
  ]);

  return <svg id={id} className={`chart h-12 ${className || ""}`} />;
};

export default BulletChart;
