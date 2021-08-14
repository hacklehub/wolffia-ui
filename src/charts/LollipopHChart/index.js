import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, selectAll } from "d3-selection";
import { max, min } from "d3-array";
import { scaleLinear, scalePoint } from "d3-scale";

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

const LollipopHorizontalChart = ({
  data = [],
  valueMin,
  valueMax,
  id,
  className,
  classNamePoints,
  classNameLines,
  classNameSymbols,
  width = 300,
  height = 200,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 50,
  paddingTop = 0,

  labelWidth = 100,
  shape = "circle",
  x = { axis: "bottom", axisTicks: 5 },
  y = { axis: "left" },
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    // Clear svg

    svg.selectAll("*").remove();
    data.sort((a, b) => b[x.key] - a[x.key]);

    const shapeMapping = {
      circle: symbolCircle,
      diamond: symbolDiamond,
      triangle: symbolTriangle,
      square: symbolSquare,
      cross: symbolCross,
      star: symbolStar,
      wye: symbolWye,
    };

    const xFn = scaleLinear()
      .domain([
        Number.isFinite(valueMin) ? valueMin : min(data, d => d[x.key]),
        Number.isFinite(valueMax) ? valueMax : max(data, d => d[x.key]),
      ])
      .range([labelWidth + paddingLeft, paddingLeft + width]);

    const yFn = scalePoint()
      .domain(data.map(d => d[y.key]))
      // .range([height + marginTop - paddingBottom, marginTop + paddingTop])
      .range([marginTop + paddingTop, marginTop + height - paddingBottom]);

    const g = svg.append("g");

    const xAxis =
      x.axis === "top"
        ? axisTop(xFn).ticks(x.axisTicks || 5)
        : axisBottom(xFn).ticks(x.axisTicks || 5);

    const xAxisG = g.append("g").attr("class", "axis--x axis ");

    xAxisG
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height + marginTop})`,
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
        `translate(${y.axis === "right" ? marginLeft + width : labelWidth},0)`,
      );

    paddingLeft &&
      xAxisG
        .append("line")
        .attr("x1", labelWidth)
        .attr("x2", labelWidth + paddingLeft)
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
        .attr("x1", labelWidth)
        .attr("y1", d => yFn(d[y.key]))
        .attr("x2", labelWidth)
        .attr("y2", d => yFn(d[y.key]))
        .transition()
        .duration(1000)
        .attr("x2", d => xFn(d[x.key]));

      pointGroup
        .append("path")
        .attr(
          "class",
          `symbols fill-current ${classNamePoints || ""} ${
            classNameSymbols || ""
          }`,
        )
        .attr("d", d => symbol(shapeMapping[shape], 100)())
        .attr("transform", d => `translate(${labelWidth},${yFn(d[y.key])})`)
        .transition()
        .duration(1000)
        .attr(
          "transform",
          d => `translate(${xFn(d[x.key])},${yFn(d[y.key])} )`,
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
      className={`${className}`}
      width={width + marginLeft + marginRight}
      height={height + marginTop + marginBottom}></svg>
  );
};

LollipopHorizontalChart.propTypes = {
  className: PropTypes.string, // Tailwind classes to be added to the chart
  data: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string.isRequired, // Need this so that chart can be selected uniquely to a page
  width: PropTypes.number,
  height: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default LollipopHorizontalChart;
