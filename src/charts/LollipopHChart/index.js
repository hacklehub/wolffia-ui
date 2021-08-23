import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles.css";

import { select, selectAll, pointer } from "d3-selection";
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
import { mergeTailwindClasses } from "../../utils";

const LollipopHChart = ({
  data = [],
  id,
  className,
  classNamePoints,
  classNameLines,
  classNameSymbols,
  marginLeft = 80,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  paddingLeft = 10,
  paddingRight = 0,
  paddingBottom = 20,
  paddingTop = 0,
  tooltip = {},
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
        Number.isFinite(x.start) ? x.start : min(data, d => d[x.key]),
        Number.isFinite(x.end) ? x.end : max(data, d => d[x.key]),
      ])
      .range([marginLeft + paddingLeft, width - paddingRight - marginRight]);

    const yFn = scalePoint()
      .domain(data.map(d => d[y.key]))
      // .range([height + marginTop - paddingBottom, marginTop + paddingTop])
      .range([marginTop + paddingTop, height - marginBottom - paddingBottom]);

    const g = svg.append("g");

    const xAxis =
      x.axis === "top"
        ? axisTop(xFn).ticks(x.axisTicks || 5)
        : axisBottom(xFn).ticks(x.axisTicks || 5);

    const xAxisG = g.append("g").attr("class", "axis--x axis ");

    xAxisG
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height - marginBottom})`,
      )
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
        .attr("x1", marginLeft)
        .attr("x2", marginLeft + paddingLeft)
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

    yAxisG.call(yAxis);

    const dataGroup = g.append("g");

    const drawLinesAndCircles = () => {
      const pointGroup = dataGroup
        .selectAll(".line")
        .data(data)
        .enter()
        .append("g")
        .on("mouseover", function (event, d) {
          tooltip && tooltipDiv.style("opacity", 1);
          const [bX, bY] = pointer(event, select("body"));
          tooltipDiv.style("left", `${bX + 10}px`).style("top", `${bY + 10}px`);
          tooltipDiv.html(
            tooltip && tooltip.html
              ? tooltip.html(d)
              : tooltip.keys
              ? tooltip.keys.map(key => `${key}: ${d[key] || ""}`).join("<br/>")
              : `${d[y.key]}: ${d[x.key]}`,
          );
        })
        .on("mouseleave", function (event, d) {
          tooltip && tooltipDiv.style("opacity", "0");
        });

      pointGroup
        .append("line")
        .attr(
          "class",
          `line stroke-current ${classNamePoints || ""} ${
            classNameLines || ""
          }`,
        )
        .attr("x1", marginLeft + paddingLeft)
        .attr("y1", d => yFn(d[y.key]))
        .attr("x2", marginLeft)
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
        .attr(
          "transform",
          d => `translate(${marginLeft + paddingLeft},${yFn(d[y.key])})`,
        )
        .transition()
        .duration(1000)
        .attr(
          "transform",
          d => `translate(${xFn(d[x.key])},${yFn(d[y.key])} )`,
        );
    };

    drawLinesAndCircles();

    const tooltipDiv = select("#root")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr("class", `tooltip ${(tooltip && tooltip.className) || ""}`);
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
        `w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart  h-64`,
        className || "",
      )}
    />
  );
};

LollipopHChart.propTypes = {
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

export default LollipopHChart;
