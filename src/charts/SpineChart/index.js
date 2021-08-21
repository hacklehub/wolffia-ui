import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, selectAll, pointer } from "d3-selection";
import { max, min, sum } from "d3-array";
import { scaleLinear, scalePoint, scaleBand } from "d3-scale";

import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";
import { mergeTailwindClasses } from "../../utils";

const SpineChart = ({
  data = [],
  id,
  className,
  paddingBar = 0.3,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingTop = 0,
  marginLeft = 40,
  marginRight = 20,
  marginTop = 40,
  marginBottom = 40,
  y,
  x,
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    svg.selectAll("*").remove();

    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    const g = svg.append("g");

    const leftSeries = x.filter(column => column.direction === "left"),
      rightSeries = x.filter(column => column.direction !== "left");

    const extreme = max([
      max(data.map(row => sum(leftSeries.map(column => row[column.key])))),
      max(data.map(row => sum(rightSeries.map(column => row[column.key])))),
    ]);

    const halfWidth =
      (width - paddingLeft - marginLeft - paddingRight - marginRight) / 2;

    const xRightFn = scaleLinear()
      .domain([0, extreme])
      .range([paddingLeft + marginLeft + halfWidth, width]);

    const xLeftFn = scaleLinear()
      .domain([0, extreme])
      .range([paddingLeft + marginLeft + halfWidth, paddingLeft + marginLeft]);

    const xLeftAxis =
      x.axis === "top"
        ? axisTop(xLeftFn).ticks(x.axisTicks || 3)
        : axisBottom(xLeftFn).ticks(x.axisTicks || 3);

    const xRightAxis =
      x.axis === "top"
        ? axisTop(xRightFn).ticks(x.axisTicks || 3)
        : axisBottom(xRightFn).ticks(x.axisTicks || 3);

    const xRightAxisG = g.append("g").attr("class", "right-axis--x axis ");

    g.append("line")
      .attr("x1", xLeftFn(0))
      .attr("x2", xLeftFn(0))
      .attr("y1", marginTop)
      .attr("y2", height - marginBottom)
      .attr("class", "stroke-current stroke-1");

    const yFn = scaleBand()
      .domain(data.map(d => d[y.key]))
      .range([marginTop + paddingTop, height - paddingBottom - marginBottom])
      .padding(paddingBar);

    leftSeries.map((column, i) => {
      const barsG = g.append("g");
      const columns = leftSeries.filter((_, idx) => idx >= i).map(c => c.key);

      const bars = barsG
        .selectAll("g")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", `${column.className} fill-current`)
        .attr("y", d => yFn(d[y.key]))
        .attr("x", xLeftFn(0))
        .attr("width", 0)
        .attr("height", yFn.bandwidth())
        .transition()
        .duration(1000)
        .attr("x", d => xLeftFn(sum(columns.map(c => d[c]))))
        .attr("width", d => xLeftFn(0) - xLeftFn(sum(columns.map(c => d[c]))));
    });
    rightSeries.map((column, i) => {
      const barsG = g.append("g");
      const columns = rightSeries.filter((_, idx) => idx >= i).map(c => c.key);

      const bars = barsG
        .selectAll("g")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", `${column.className} fill-current`)
        .attr("x", d => xRightFn(0))
        .attr("z-index", 100 - i)
        .attr("y", d => yFn(d[y.key]))
        .attr("height", yFn.bandwidth())
        .transition()
        .duration(1000)
        .attr(
          "width",
          d => xRightFn(sum(columns.map(c => d[c]))) - xRightFn(0),
        );
    });

    // Draw axis

    xRightAxisG
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height - marginBottom})`,
      )
      .call(xRightAxis);

    const xLeftAxisG = g.append("g").attr("class", "left-axis--x axis ");

    xLeftAxisG
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height - marginBottom})`,
      )
      .call(xLeftAxis);

    const yAxis = y.direction === "left" ? axisRight(yFn) : axisLeft(yFn);
    const yAxisG = g
      .append("g")
      .attr("class", "yAxis axis")
      .attr(
        "transform",
        `translate(${y.direction === "left" ? width : marginLeft},0)`,
      );

    yAxisG.call(yAxis);
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
      className={mergeTailwindClasses(`class h-64`, className || "")}
    />
  );
};

export default SpineChart;
