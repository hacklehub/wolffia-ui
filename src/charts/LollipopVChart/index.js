import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, selectAll } from "d3-selection";
import { max, min } from "d3-array";
import { scaleLinear, scaleBand, scalePoint } from "d3-scale";

import {
  symbol,
  symbolDiamond,
  symbolCircle,
  symbolSquare,
  symbolTriangle,
  symbolWye,
  symbolCross,
  symbolStar,
} from "d3-shape";

import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";
import { mergeTailwindClasses } from "../../utils";

const LollipopVChart = ({
  data = [],
  valueMin,
  valueMax,
  id,
  className,
  classNamePoints,
  classNameLines,
  classNameSymbols,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingTop = 0,
  shape = "circle",
  x = { axis: "bottom", axisTicks: 5 },
  y = { axis: "left" },
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    // Clear svg

    svg.selectAll("*").remove();

    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    data.sort((a, b) => b[y.key] - a[y.key]);

    const shapeMapping = {
      circle: symbolCircle,
      diamond: symbolDiamond,
      triangle: symbolTriangle,
      square: symbolSquare,
      cross: symbolCross,
      star: symbolStar,
      wye: symbolWye,
    };

    const minValue = Number.isFinite(y.start)
        ? y.start
        : min(data, d => d[y.key]),
      maxValue = Number.isFinite(valueMax)
        ? valueMax
        : max(data, d => d[y.key]);

    const xFn = scaleBand()
      .domain(data.map(d => d[x.key]))
      .range([marginLeft + paddingLeft, width - marginRight - paddingRight]);
    const yFn = scaleLinear()
      .domain([minValue, maxValue])
      .range([height - marginBottom - paddingBottom, marginTop + paddingTop]);

    const g = svg.append("g");

    const xAxis = x.axis === "top" ? axisTop(xFn) : axisBottom(xFn);

    const xAxisG = g.append("g").attr("class", "axis--x axis");

    xAxisG
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height - marginBottom})`,
      )
      .transition()
      .duration(1000)
      .call(xAxis);

    const yAxis = y.axis === "right" ? axisRight(yFn) : axisLeft(yFn);

    const yAxisG = g
      .append("g")
      .attr("class", "yAxis axis")
      .attr(
        "transform",
        `translate(${y.axis === "right" ? marginLeft + width : marginLeft},0)`,
      );

    paddingLeft &&
      xAxisG
        .append("line")
        .attr("x1", 0)
        .attr("x2", paddingLeft)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", "currentColor");

    paddingBottom &&
      yAxisG
        .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", marginTop + height - paddingBottom)
        .attr("y2", marginTop + height)
        .attr("stroke", "currentColor");

    yAxisG.transition().duration(1000).call(yAxis);

    const dataGroup = g.append("g");
    const drawLinesAndCircles = () => {
      const pointGroup = dataGroup
        .selectAll(".line")
        .data(data)
        .enter()
        .append("g");

      pointGroup
        .append("line")
        .attr(
          "class",
          `line stroke-current ${classNamePoints || ""} ${
            classNameLines || ""
          }`,
        )
        .attr("x1", d => xFn(d[x.key]) + xFn.bandwidth() / 2)
        .attr("y1", d => yFn(minValue))
        .attr("x2", d => xFn(d[x.key]) + xFn.bandwidth() / 2)
        .attr("y2", d => yFn(minValue))
        .transition()
        .duration(1000)
        .attr("y1", d => yFn(d[y.key]));

      pointGroup
        .append("path")
        .attr(
          "class",
          `symbols fill-current ${classNamePoints || ""} ${
            classNameSymbols || ""
          }`,
        )
        .attr("d", d => symbol(shapeMapping[shape], 100)())
        .attr(
          "transform",
          d =>
            `translate(${xFn(d[x.key]) + xFn.bandwidth() / 2},${yFn(
              minValue,
            )})`,
        )
        .transition()
        .duration(1000)
        .attr(
          "transform",
          d =>
            `translate(${xFn(d[x.key]) + xFn.bandwidth() / 2},${yFn(
              d[y.key],
            )} )`,
        );
    };

    drawLinesAndCircles();
  };

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll(".tooltip").remove();
    };
  }, [data]);

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(
        `w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart  h-48`,
        className || "",
      )}
    />
  );
};

export default LollipopVChart;
