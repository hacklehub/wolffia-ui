import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, pointer, selectAll } from "d3-selection";
import { scaleTime, scaleLinear } from "d3-scale";
import { max, min, minIndex } from "d3-array";

import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";

import { transition } from "d3-transition";
import { DateTime } from "luxon";
import { line, zoom, easeSin, curveMonotoneX, brushX } from "d3";

const LineChart = ({
  data = [],
  id,
  className,
  x,
  y,
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
              x.start !== null && x.start !== undefined
                ? x.start
                : min(data.map(d => toDateTime(d))),
              x.end !== null && x.end !== undefined
                ? x.end
                : max(data.map(d => toDateTime(d)))
            ])
            .nice()
        : scaleLinear().domain([
            x.start !== null && x.start !== undefined
              ? x.start
              : !x.convert
              ? min(data.map(d => d[x.key]))
              : min(data.map(d => x.convert(d))),
            x.end !== null && x.end !== undefined
              ? x.end
              : x.convert
              ? max(data.map(d => x.convert(d)))
              : max(data.map(d => d[x.key]))
          ]);
    xFn.range([marginLeft, width + marginLeft]);

    const xAxis =
      xAxis === "top"
        ? axisTop(xFn).ticks(x.axisTicks || 5)
        : axisBottom(xFn).ticks(x.axisTicks || 5);

    const g = svg.append("g");

    const minLeftYs =
        allLeftY.length > 0 &&
        min([
          ...allLeftY.map((column, minValue) =>
            min(data.map(d => d[column.key]))
          ),
          ...allLeftY.map(column => column.start)
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

    g.append("g")
      .attr("class", "xAxis axis")
      .attr("transform", `translate(0, ${height + marginTop})`)
      .transition()
      .duration(400)
      .call(xAxis);

    yLeftAxis &&
      g
        .append("g")
        .attr("class", "axis axis--left-y")
        .attr("transform", `translate(${marginLeft},0)`)
        .transition()
        .duration(400)
        .call(yLeftAxis);

    yRightAxis &&
      g
        .append("g")
        .attr("class", "axis axis--right-y")
        .attr("transform", `translate(${width + marginLeft},0)`)
        .call(yRightAxis);

    // Todo Brush zooming

    const brush = brushX() // Add the brush feature using the d3.brush function
      .extent([
        [0, 0],
        [width, height]
      ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updateChart);

    const updateChart = (event, d) => {
      const extent = event.selection;

      console.log(extent);
    };

    // Draw left axis values
    const leftG = g.append("g").attr("class", "left-g");

    allLeftY.map(column => {
      const newLine = line()
        .x(d =>
          x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key])
        )
        .y(d => yLeftFn(d[column.key]))
        .curve(column.curve || curveMonotoneX);

      const seriesPath = leftG
        .append("path")
        .datum(data.filter(d => d[column.key]))
        .attr("fill", "none")
        .attr("stroke", column.color || "#000000")
        .attr("d", newLine);

      const pathLength = seriesPath.node().getTotalLength();

      const transitionPath = transition().ease(easeSin).duration(400);

      seriesPath
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);

      seriesPath.append("g").attr("class", "brush").call(brush);

      const leftCircles = leftG
        .selectAll(".left-g")
        .data(data.filter(d => d[column.key]))
        .enter()
        .append("circle")
        .attr("cx", d =>
          x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key])
        )
        .attr("cy", d => yLeftFn(d[column.key]))
        .attr("fill", column.color)
        .transition()
        .ease(easeSin)
        .duration(400)
        .attr("r", d => (d[column.key] ? 3 : 0));
    });

    const rightG = g.append("g");
    allRightY.map(column => {
      const newLine = line()
        .x(d =>
          x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key])
        )
        .y(d => yRightFn(d[column.key]))
        .curve(column.curve || curveMonotoneX);

      const seriesPath = rightG
        .append("path")
        .datum(data.filter(d => d[column.key]))
        .attr("fill", "none")
        .attr("stroke", column.color || "#000000")
        .attr("d", newLine);

      const pathLength = seriesPath.node().getTotalLength();

      const transitionPath = transition().ease(easeSin).duration(400);

      seriesPath
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);

      const rightCircles = leftG
        .selectAll(".left-g")
        .data(data.filter(d => d[column.key]))
        .enter()
        .append("circle")
        .attr("cx", d =>
          x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key])
        )
        .attr("cy", d => yRightFn(d[column.key]))
        .attr("fill", column.color)
        .transition()
        .ease(easeSin)
        .duration(400)
        .attr("r", d => (d[column.key] ? 3 : 0));
    });
    // Tooltips

    function onMouseOverG(event) {}

    function onMouseLeave(event) {
      selectAll(".tooltip").remove();
      selectAll(".axisPointLine").remove();
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

    showGuidelines &&
      svg
        .on("mouseenter", onMouseOverG)
        .on("mousemove", onMouseMove)
        .on("mouseleave", onMouseLeave);
  };

  useEffect(() => {
    refreshChart();
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
      color: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    })
  ),
  width: PropTypes.number,
  height: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number
};

export default LineChart;
