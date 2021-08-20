import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, selectAll, pointer } from "d3-selection";
import { max, min, sum } from "d3-array";
import { scaleLinear, scalePoint, scaleBand } from "d3-scale";

import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";

const BarChartGrouped = ({
  data = [],
  id,
  className,
  direction = "right",
  width = 490,

  height = 200,
  paddingBar = 0.3,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingTop = 0,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  referenceLines = [],
  labelWidth = 150,
  x,
  y,
  tooltip,
  drawing,
  dataLabel = false,
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    const yFn = scaleBand()
      .domain(data.map(d => d[y.key]))
      .range([marginTop + paddingTop, marginTop + height - paddingBottom])
      .padding(paddingBar);

    const xFnRange =
      direction === "left"
        ? [width, labelWidth + paddingLeft]
        : [labelWidth + paddingLeft, width - paddingRight];

    const xFn = scaleLinear()
      .domain([0, max(data.map(d => sum(x.map(value => d[value.key]))))])
      .range(xFnRange);

    x.map((column, i) => {
      const barsG = g.append("g");

      // Cumulative columns
      const columns = x.filter((_, idx) => idx >= i).map(c => c.key);

      const bars = barsG
        .selectAll("g")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", `${column.className} fill-current`)
        .attr("x", xFn(0))
        .attr("y", d => yFn(d[y.key]))
        .style("z-index", 10 - i)
        .attr("width", d =>
          drawing && drawing.duration
            ? 0
            : xFn(columns.reduce((sum, c) => sum + d[c], 0)) - xFn(0),
        )
        .attr("height", yFn.bandwidth())
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
          .attr("width", d => {
            const columns = x.filter((_, idx) => idx >= i).map(c => c.key);
            return xFn(columns.reduce((sum, c) => sum + d[c], 0)) - xFn(0);
          });

      dataLabel &&
        barsG
          .selectAll("g")
          .data(data)
          .enter()
          .append("text")
          .text(d =>
            dataLabel.text ? dataLabel.text(d, column) : d[column.key],
          )
          .attr("class", "fill-current")
          .attr("text-anchor", direction === "left" ? "start" : "end")
          .attr(
            "x",
            d =>
              xFn(columns.reduce((sum, c) => sum + d[c], 0)) -
              (direction === "left" ? 5 : 2),
          )
          .attr("font-size", "0.6em")
          .attr("y", d => yFn(d[y.key]) + yFn.bandwidth() / 2 + 4);
    });

    const tooltipDiv = select("#root")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr("class", `tooltip ${(tooltip && tooltip.className) || ""}`);

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
        `translate(${direction === "left" ? width : labelWidth},0)`,
      );

    xAxisG
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height + marginTop})`,
      )
      .call(xAxis);

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
      className={`${className}`}
      width={width + marginLeft + marginRight}
      height={height + marginTop + marginBottom}
    />
  );
};

export default BarChartGrouped;
