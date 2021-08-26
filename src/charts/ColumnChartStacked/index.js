import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, selectAll, pointer } from "d3-selection";
import { max, min, sum } from "d3-array";
import { format } from "d3-format";
import { scaleLinear, scalePoint, scaleBand } from "d3-scale";

import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";
import { mergeTailwindClasses } from "../../utils";

const ColumnChartStacked = ({
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
  waterfall,
  drawing,
  tooltip,
  direction = "top",
  tickFormat,
}) => {
  const formatMapping = {
    "%": ".0%",
    $: "($.2f",
    tri: ",.2r",
    hex: "#x",
    SI: ".2s",
  };

  const refreshChart = () => {
    const svg = select(`#${id}`);
    svg.selectAll("*").remove();
    const g = svg.append("g");

    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    const xFn = scaleBand()
      .domain(data.map(d => d[x.key]))
      .range([marginLeft + paddingLeft, width - marginRight - paddingRight])
      .padding(paddingBar);

    const yFnRange = [
      height - marginBottom - paddingBottom,
      marginTop + paddingTop,
    ];

    const yFn = scaleLinear()
      .domain([0, max(data.map(d => sum(y.map(value => d[value.key]))))])
      .range(yFnRange);

    y.map((column, i) => {
      const barsG = g.append("g");

      const afterColumns = y.filter((_, idx) => idx > i).map(c => c.key);

      const bars = barsG
        .selectAll("g")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", `${column.className} fill-current`)
        .attr("z-index", 100 - i)
        .attr(
          "x",
          d =>
            xFn(d[x.key]) + (waterfall ? (xFn.bandwidth() / y.length) * i : 0),
        )
        .attr("y", (d, idx) =>
          yFn(sum(afterColumns.map(c => d[c])) + d[column.key]),
        )
        .style("z-index", 10 + i)
        .attr("width", d =>
          waterfall
            ? xFn.bandwidth() / y.length - (waterfall.padding || 0)
            : xFn.bandwidth(),
        )
        .attr("height", d =>
          waterfall
            ? yFn(0) - yFn(d[column.key] || 0)
            : yFn(0) -
              yFn(sum(afterColumns.map(c => d[c])) + (d[column.key] || 0)),
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
                : `${d[x.key]} <br/> ${column.key} ${
                    tickFormat
                      ? formatMapping[tickFormat]
                        ? format(formatMapping[tickFormat])(d[column.key])
                        : format(tickFormat)
                      : d[column.key]
                  }`,
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
    });

    const tooltipDiv = select("#root")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr("class", `tooltip ${(tooltip && tooltip.className) || ""}`);

    const yAxis = y.axis === "right" ? axisRight(yFn) : axisLeft(yFn);

    tickFormat &&
      yAxis.tickFormat(
        formatMapping[tickFormat]
          ? format(formatMapping[tickFormat])
          : format(tickFormat),
      );

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

export default ColumnChartStacked;
