import React, { useState, useEffect } from "react";

import "../../styles.css";
import PropTypes from "prop-types";

import { select, selectAll, pointer } from "d3-selection";
import { max, min, sum } from "d3-array";
import { scaleLinear, scalePoint, scaleBand } from "d3-scale";

import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";

import { mergeTailwindClasses } from "../../utils";

const BarChartGrouped = ({
  data = [],
  id,
  className,
  direction = "right",
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingBar = 0.2,
  paddingTop = 0,
  marginLeft = 60,
  marginRight = direction === "right" ? 20 : 40,
  marginTop = x && x.axis === "top" ? 40 : 20,
  marginBottom = x && x.axis === "top" ? 20 : 40,
  referenceLines = [],
  x,
  y,
  tooltip,
  drawing,
  dataLabel = false,
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    svg.selectAll("*").remove();

    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    const minStart = min(x.map(column => column.start)),
      minX = min(x.map(column => min(data, d => d[column.key]))),
      maxX = max(x.map(column => max(data, d => d[column.key]))),
      maxEnd = max(x.map(column => column.end)),
      areAllGreaterThanZero = minX > 0;

    const xFnRange =
      direction === "left"
        ? [width - marginRight - paddingRight, marginLeft + paddingLeft]
        : [marginLeft + paddingLeft, width - marginRight - paddingRight];

    const xFn = scaleLinear()
      .domain([
        Number.isFinite(minStart) ? minStart : areAllGreaterThanZero ? 0 : minX,
        Number.isFinite(maxEnd) ? maxEnd : maxX,
      ])
      .range(xFnRange);

    const yFn = scaleBand()
      .domain(data.map(d => d[y.key]))
      .range([marginTop + paddingTop, height - marginBottom - paddingBottom])
      .padding(paddingBar);

    const g = svg.append("g");

    const xAxis =
      x.axis === "top"
        ? axisTop(xFn).ticks(x.axisTicks || 5)
        : axisBottom(xFn).ticks(x.axisTicks || 5);

    const xAxisG = g.append("g").attr("class", "axis--x axis ");

    const yAxis = direction === "left" ? axisRight(yFn) : axisLeft(yFn);
    const yAxisG = g
      .append("g")
      .attr("class", "yAxis axis")
      .attr(
        "transform",
        `translate(${
          direction === "left" ? width - marginRight : marginLeft
        },0)`,
      );

    x.map((column, i) => {
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
        .attr("x", d =>
          direction === "left"
            ? d[column.key] < 0
              ? xFn(0)
              : xFn(d[column.key])
            : d[column.key] < 0
            ? xFn(d[column.key])
            : xFn(minStart || 0),
        )
        .attr("y", d => yFn(d[y.key]) + (i * yFn.bandwidth()) / x.length)
        .attr("width", d =>
          drawing && drawing.duration
            ? 0
            : direction === "left"
            ? xFn(minStart || 0) - xFn(Math.abs(d[column.key]))
            : d[column.key] < 0
            ? xFn(minStart || 0) - xFn(d[column.key])
            : xFn(Math.abs(d[column.key])) - xFn(minStart || 0),
        )
        .attr("height", yFn.bandwidth() / x.length)
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
                : `${d[y.key]} <br/> ${column.key} ${d[column.key]}`,
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

      drawing &&
        drawing.duration &&
        bars
          .transition()
          .duration(drawing.duration)
          .delay((d, idx) => i * (drawing.delay || 100) + idx * 100)
          .attr("width", d =>
            direction === "left"
              ? xFn(minStart || 0) - xFn(Math.abs(d[column.key]))
              : d[column.key] < 0
              ? xFn(minStart || 0) - xFn(d[column.key])
              : xFn(Math.abs(d[column.key])) - xFn(minStart || 0),
          );

      dataLabel &&
        barsG
          .selectAll("g")
          .data(data)
          .enter()
          .append("text")
          .text(d => d[column.key])
          .attr("class", "fill-current")
          .attr("text-anchor", direction === "left" ? "start" : "end")
          .attr("x", d => xFn(d[column.key]) + (direction === "left" ? 5 : -2))
          .attr("font-size", "0.6em")
          .attr(
            "y",
            d =>
              yFn(d[y.key]) +
              ((i + 1) * yFn.bandwidth()) / x.length -
              yFn.bandwidth() / x.length / 4,
          );
    });

    const tooltipDiv = select("#root")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr("class", `tooltip ${(tooltip && tooltip.className) || ""}`);

    xAxisG
      .attr(
        "transform",
        `translate(0, ${
          x.axis === "top" ? marginTop : height - marginBottom - paddingBottom
        })`,
      )
      .call(xAxis);
    yAxisG.call(yAxis);
  };

  useEffect(() => {
    refreshChart();
    const resize = window.addEventListener("resize", refreshChart());
    return () => {
      selectAll(".tooltip").remove();
      window.removeEventListener("resize", resize);
    };
  }, [data]);

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(
        `w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart  h-80 `,
        className || "",
      )}
    />
  );
};

BarChartGrouped.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  direction: PropTypes.string,
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
  x: PropTypes.arrayOf(PropTypes.object).isRequired,
  y: PropTypes.object.isRequired,
  tooltip: PropTypes.shape({
    html: PropTypes.func,
    className: PropTypes.string,
    keys: PropTypes.arrayOf(PropTypes.string),
  }),
  drawing: PropTypes.object,
  dataLabel: PropTypes.bool,
};

export default BarChartGrouped;
