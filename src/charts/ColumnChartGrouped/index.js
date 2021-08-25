import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, selectAll, pointer } from "d3-selection";
import { max, min, sum } from "d3-array";
import { scaleLinear, scalePoint, scaleBand } from "d3-scale";

import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";
import { mergeTailwindClasses } from "../../utils";

const ColumnChartGrouped = ({
  data = [],
  id,
  className,
  x,
  y,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingTop = 0,
  paddingBar = 0.2,
  drawing,
  tooltip,
  direction = "top",
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    svg.selectAll("*").remove();
    const g = svg.append("g");

    const minStart = min(y.map(column => column.start)),
      minY = min(y.map(column => min(data, d => d[column.key]))),
      maxY = max(y.map(column => max(data, d => d[column.key]))),
      maxEnd = max(y.map(column => column.end)),
      areAllGreaterThanZero = minY > 0;

    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    const xFn = scaleBand()
      .domain(data.map(d => d[x.key]))
      .range([marginLeft + paddingLeft, width - marginRight - paddingRight])
      .padding(paddingBar);

    const yFn = scaleLinear()
      .domain([Number.isFinite(minStart) ? minStart : minY, maxEnd || maxY])
      .range([height - marginBottom - paddingBottom, marginTop + paddingTop]);

    y.map((column, i) => {
      const barsG = g.append("g");

      const bars = barsG
        .selectAll("g")
        .data(data)
        .enter()
        .append("rect")
        .attr(
          "class",
          d =>
            `fill-current ${
              column.classNameNegative && d[column.key] < 0
                ? column.classNameNegative
                : column.className
            }`,
        )
        .attr("x", d => xFn(d[x.key]) + (i * xFn.bandwidth()) / y.length)
        .attr("y", d =>
          drawing && drawing.duration ? yFn(0) : yFn(d[column.key]),
        )
        .attr("width", xFn.bandwidth() / y.length)
        .attr("height", d =>
          drawing && drawing.duration
            ? 0
            : d[column.key]
            ? height - marginBottom - yFn(d[column.key])
            : 0,
        )
        .on("mouseenter", function (event, d) {
          if (tooltip) {
            tooltipDiv.style("opacity", 1);
            const [bX, bY] = pointer(event, select("body"));
            tooltipDiv
              .style("left", `${bX + 10}px`)
              .style("top", `${bY + 10}px`);
            tooltipDiv.html(
              tooltip && tooltip.html
                ? tooltip.html(d)
                : tooltip.keys
                ? tooltip.keys
                    .map(key => `${key}: ${d[key] || ""}`)
                    .join("<br/>")
                : `${d[x.key]} <br/> ${column.key} ${d[column.key]}`,
            );
          }
        })
        .on("mousemove", function (event, d) {
          const [bX, bY] = pointer(event, select("body"));
          tooltipDiv.style("left", `${bX + 10}px`).style("top", `${bY + 10}px`);
        })
        .on("mouseleave", function (event, d) {
          tooltip &&
            tooltipDiv
              .style("opacity", "0")
              .style("left", `0px`)
              .style("top", `0px`);
        });

      drawing?.duration &&
        bars
          .transition()
          .duration(drawing.duration)
          .attr("y", d => yFn(d[column.key]))
          .attr("height", d =>
            Number.isFinite(d[column.key])
              ? height - marginBottom - yFn(d[column.key])
              : 0,
          );
    });

    const tooltipDiv = select("#root")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr("class", `tooltip ${(tooltip && tooltip.className) || ""}`);

    const yAxis = y.axis === "right" ? axisRight(yFn) : axisLeft(yFn);

    const yAxisG = g
      .append("g")
      .attr("class", "yAxis axis")
      .attr(
        "transform",
        `translate(${y.axis === "right" ? marginLeft + width : marginLeft},0)`,
      );
    yAxisG.call(yAxis);

    const xAxis = x.axis === "top" ? axisTop(xFn) : axisBottom(xFn);

    const xAxisG = g.append("g").attr("class", "axis--x axis");

    xAxisG
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height - marginBottom})`,
      )
      .call(xAxis);
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
        "w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart h-80",
        className,
      )}
    />
  );
};

ColumnChartGrouped.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingBar: PropTypes.number,
  paddingTop: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  referenceLines: PropTypes.arrayOf(PropTypes.object),
  y: PropTypes.arrayOf(PropTypes.object).isRequired,
  x: PropTypes.object.isRequired,
  tooltip: PropTypes.shape({
    html: PropTypes.func,
    className: PropTypes.string,
    keys: PropTypes.arrayOf(PropTypes.string),
  }),
  drawing: PropTypes.object,
  dataLabel: PropTypes.bool,
};

export default ColumnChartGrouped;
