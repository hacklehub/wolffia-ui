import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, pointer, selectAll } from "d3-selection";
import { scaleTime, scaleLinear } from "d3-scale";
import { max, min, minIndex } from "d3-array";
import {
  curveStep,
  curveLinear,
  line,
  symbol,
  symbolDiamond,
  symbolCircle
} from "d3-shape";
import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";

import { easeSin } from "d3-ease";
import { transition } from "d3-transition";
import { DateTime } from "luxon";

const LineChart = ({
  data = [],
  id,
  className,
  x,
  y,
  tooltip,
  width = 490,
  height = 200,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  showGuidelines = false
}) => {
  const refreshChart = async () => {
    const allLeftY = y.filter(column => column.axis !== "right"),
      allRightY = y.filter(column => column.axis === "right");

    const toDateTime = d => DateTime.fromFormat(d[x.key], x.format);
    const svg = select(`#${id}`);
    // Clear svg

    svg.selectAll("*").remove();

    const xFn =
      x.scalingFunction === "time"
        ? scaleTime()
            .domain([
              Number.isFinite(x.start)
                ? x.start
                : min(data.map(d => toDateTime(d))),
              Number.isFinite(x.end) ? x.end : max(data.map(d => toDateTime(d)))
            ])
            .nice()
        : scaleLinear().domain([
            Number.isFinite(x.start)
              ? x.start
              : !x.convert
              ? min(data.map(d => d[x.key]))
              : min(data.map(d => x.convert(d))),
            Number.isFinite(x.start)
              ? x.end
              : x.convert
              ? max(data.map(d => x.convert(d)))
              : max(data.map(d => d[x.key]))
          ]);
    xFn.range([marginLeft, width + marginLeft]);

    const xAxis =
      x.axis === "top"
        ? axisTop(xFn).ticks(x.axisTicks || 5)
        : axisBottom(xFn).ticks(x.axisTicks || 5);

    const g = svg.append("g");

    const minLeftYs =
        allLeftY.length > 0 &&
        min([
          ...allLeftY.map(column => column.start),
          ...allLeftY.map((column, minValue) =>
            min(data.map(d => d[column.key]))
          )
        ]),
      maxLeftYs =
        allLeftY.length > 0 &&
        max([
          ...allLeftY.map(column => max(data.map(d => d[column.key]))),
          ...allLeftY.map(column => column.end)
        ]),
      minTicksLeft =
        allLeftY.length > 0 && min(allLeftY.map(column => column.ticks));

    const yLeftFn =
      allLeftY.length > 0 &&
      scaleLinear()
        .domain([minLeftYs, maxLeftYs])
        .range([height + marginTop, marginTop]);

    const yLeftAxis =
      allLeftY.length > 0 && axisLeft(yLeftFn).ticks(minTicksLeft || 5);

    const minRightYs =
        allRightY.length > 0 &&
        min([
          ...allRightY.map(column => min(data.map(d => d[column.key]))),
          ...allRightY.map(column => column.start)
        ]),
      maxRightYs =
        allRightY.length > 0 &&
        max([
          ...allRightY.map(column => max(data.map(d => d[column.key]))),
          ...allRightY.map(column => column.end)
        ]);

    const yRightFn =
      allRightY.length > 0 &&
      scaleLinear()
        .domain([minRightYs, maxRightYs])
        .range([height + marginTop, marginTop]);

    const yRightAxis = allRightY.length > 0 && axisRight(yRightFn);

    const xAxisG = g
      .append("g")
      .attr("class", "axis--x axis")
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height + marginTop})`
      )
      .transition()
      .duration(100)
      .call(xAxis);

    yLeftAxis &&
      g
        .append("g")
        .attr("class", "axis axis--left-y")
        .attr("transform", `translate(${marginLeft},0)`)
        .transition()
        .duration(100)
        .call(yLeftAxis);

    yRightAxis &&
      g
        .append("g")
        .attr("class", "axis axis--right-y")
        .attr("transform", `translate(${width + marginLeft},0)`)
        .call(yRightAxis);

    // Todo Brush zooming

    // Draw left axis values
    const leftG = g.append("g").attr("class", "left-g");

    allLeftY.map(column => {
      const seriesData = data.filter(
        d => Number.isFinite(d[column.key]) || column.handleNull === "zero"
      );

      const columnCurve = column.curve === "step" && curveStep;

      const newLine = line()
        .x(d =>
          x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key])
        )
        .y(d => yLeftFn(d[column.key] || (column.handleNull === "zero" && 0)))
        .curve(columnCurve || curveLinear);

      const seriesPath = leftG
        .append("path")
        .attr("class", column.className || "stroke-current text-black")
        .datum(seriesData)
        .attr("fill", "none")
        .attr("d", newLine);

      if (column.transition !== "none") {
        const pathLength = seriesPath.node().getTotalLength();

        seriesPath
          .attr("stroke-dashoffset", pathLength)
          .attr("stroke-dasharray", pathLength)
          .transition(transition().ease(easeSin).duration(600))
          .attr("stroke-dashoffset", 0);
      }

      const leftCircles = leftG
        .selectAll(".left-g")
        .data(seriesData)
        .enter()
        .append("path")
        .attr(
          "d",
          // Todo other symbols
          symbol()
            .type(column.symbol ? symbolDiamond : symbolCircle)
            .size(16)
        )
        .attr("class", `${column.className} fill-current`)
        .attr(
          "transform",
          d =>
            `translate(${
              x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key])
            },${yLeftFn(d[column.key] || (column.handleNull === "zero" && 0))})`
        );
    });

    const rightG = g.append("g");
    allRightY.map(column => {
      const newLine = line()
        .x(d =>
          x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key])
        )
        .y(d => yRightFn(d[column.key] || (column.handleNull === "zero" && 0)))
        .curve(column.curve || curveLinear);

      const seriesData = data.filter(
        d => Number.isFinite(d[column.key]) || column.handleNull === "zero"
      );
      const seriesPath = rightG
        .append("path")
        .attr("class", column.className || "stroke-current text-black")
        .datum(seriesData)
        .attr("fill", "none")
        .attr("d", newLine);

      if (column.transition !== "none") {
        const pathLength = seriesPath.node().getTotalLength();

        seriesPath
          .attr("stroke-dashoffset", pathLength)
          .attr("stroke-dasharray", pathLength)
          .transition(transition().ease(easeSin).duration(600))
          .attr("stroke-dashoffset", 0);
      }

      const rightCircles = leftG
        .selectAll(".left-g")
        .data(seriesData)
        .enter()
        .append("path")
        .attr(
          "d",
          // Todo other symbols
          symbol()
            .type(column.symbol ? symbolDiamond : symbolCircle)
            .size(16)
        )
        .attr("class", `${column.className} fill-current`)
        .attr(
          "transform",
          d =>
            `translate(${
              x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key])
            },${yLeftFn(d[column.key] || (column.handleNull === "zero" && 0))})`
        );
    });
    // Tooltips

    const tooltipDiv = select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute");

    tooltipDiv.attr("class", `tooltip ${tooltip.className || ""}`);
    tooltip.style &&
      Object.entries(tooltip.style).map(([key, value]) =>
        tooltipDiv.style(key, value)
      );

    function onMouseOverG(event) {
      tooltip && tooltipDiv.style("opacity", 1);
    }

    function onMouseLeave(event) {
      selectAll(".axisPointLine").remove();

      tooltip && tooltipDiv.style("opacity", "0");
    }

    function drawHLine(x, y, direction = "left") {
      g.append("line")
        .attr("class", "axisPointLine")
        .attr("x1", direction === "left" ? marginLeft : x)
        .attr("x2", direction === "left" ? x : width + marginLeft)
        .attr("y1", y)
        .attr("y2", y)
        .attr("stroke", "#dddddd")
        .style("stroke-width", 1)
        .style("stroke-dasharray", "10,5");
    }
    function drawVLine(x, y) {
      g.append("line")
        .attr("class", "axisPointLine")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", y)
        .attr("y2", height + marginTop)
        .attr("stroke", "#dddddd")
        .style("stroke-width", 1)
        .style("stroke-dasharray", "10,5");
    }

    function onMouseMove(event) {
      selectAll(".axisPointLine").remove();

      const [cX, cY] = pointer(event, this);

      const xValue = d =>
        x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key]);

      const xDistances = data.map(d => Math.abs(xValue(d) - cX));
      const closestPoint = minIndex(xDistances);
      const dataClosest = data[closestPoint];
      const dataLeft = allLeftY.map(column => dataClosest[column.key]);
      const dataRight = allRightY.map(column => dataClosest[column.key]);

      if (showGuidelines) {
        drawVLine(
          xValue(dataClosest),
          max([
            yLeftFn && yLeftFn(max(dataLeft)),
            yRightFn && yRightFn(max(dataRight))
          ])
        );

        dataLeft.map(
          yValue => yValue && drawHLine(xValue(dataClosest), yLeftFn(yValue))
        );
        dataRight.map(
          yValue =>
            yValue && drawHLine(xValue(dataClosest), yRightFn(yValue), "right")
        );
      }

      tooltip && moveTooltip(event, dataClosest);
    }

    const moveTooltip = (event, row) => {
      const [bX, bY] = pointer(event, select("body"));

      tooltipDiv.style("left", `${bX + 10}px`).style("top", `${bY + 10}px`);
      tooltipDiv.html(
        tooltip.html
          ? tooltip.html(row)
          : tooltip.keys
          ? tooltip.keys.map(key => `${key}: ${row[key] || ""}`).join("<br/>")
          : Object.entries(row)
              .map(([key, value]) => `${key}: ${value}`)
              .join("<br/>")
      );
    };

    svg
      .on("mouseover", onMouseOverG)
      .on("mousemove", onMouseMove)
      .on("mouseleave", onMouseLeave);
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

LineChart.propTypes = {
  className: PropTypes.string, // Tailwind classes to be added to the chart
  data: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string.isRequired, // Need this so that chart can be selected uniquely to a page
  x: PropTypes.shape({
    key: PropTypes.string,
    scalingFunction: PropTypes.oneOf(["linear", "time"]),
    convert: PropTypes.func,
    axis: PropTypes.oneOf(["bottom", "top"]),
    axisTicks: PropTypes.number,
    axisLabel: PropTypes.string,
    start: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    end: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  }),
  y: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      axis: PropTypes.oneOf(["left", "right"]),
      start: PropTypes.number,
      end: PropTypes.number,
      ticks: PropTypes.number,
      className: PropTypes.string,
      handleNull: PropTypes.oneOf(["zero"])
    })
  ),
  tooltip: PropTypes.shape({
    keys: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    html: PropTypes.func
  }),
  width: PropTypes.number,
  height: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number
};

export default LineChart;
