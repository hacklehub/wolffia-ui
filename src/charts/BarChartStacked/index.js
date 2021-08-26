import React, { useState, useEffect } from "react";
import "../../styles.css";

import PropTypes from "prop-types";

import { select, selectAll, pointer } from "d3-selection";
import { max, min, sum } from "d3-array";
import { format } from "d3-format";
import { scaleLinear, scalePoint, scaleBand } from "d3-scale";

import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";

import { mergeTailwindClasses } from "../../utils";

const BarChartStacked = ({
  data = [],
  id,
  className,
  direction = "right",
  paddingBar = 0.3,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingTop = 0,
  marginLeft = 60,
  marginRight = direction === "right" ? 20 : 40,
  marginTop = x && x.axis === "top" ? 40 : 20,
  marginBottom = x && x.axis === "top" ? 20 : 40,
  referenceLines = [],
  waterfall,
  x,
  tickFormat,
  y,
  tooltip,
  drawing,
  dataLabel = false,
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

    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    const g = svg.append("g");

    const yFn = scaleBand()
      .domain(data.map(d => d[y.key]))
      .range([marginTop + paddingTop, height - marginBottom - paddingBottom])
      .padding(paddingBar);

    const xFnRange =
      direction === "left"
        ? [width - marginRight - paddingRight, marginLeft + paddingLeft]
        : [marginLeft + paddingLeft, width - marginRight - paddingRight];

    const xFn = scaleLinear()
      .domain([0, max(data.map(d => sum(x.map(value => d[value.key]))))])
      .range(xFnRange);

    x.reverse();

    x.map((column, i) => {
      const barsG = g.append("g");

      // Cumulative columns
      const afterColumns = x.filter((_, idx) => idx > i).map(c => c.key);

      const bars = barsG
        .selectAll("g")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", `${column.className} fill-current`)
        .attr("z-index", 100 - i)
        .attr("x", d =>
          waterfall ? xFn(sum(afterColumns.map(c => d[c]))) : xFn(0),
        )
        .attr(
          "y",
          (d, idx) =>
            yFn(d[y.key]) +
            (waterfall ? (yFn.bandwidth() / x.length) * (x.length - i) : 0),
        )
        .style("z-index", 10 + i)
        .attr("width", d =>
          drawing && drawing.duration
            ? 0
            : waterfall
            ? xFn(d[column.key] || 0) - xFn(0)
            : xFn(sum(afterColumns.map(c => d[c])) + (d[column.key] || 0)) -
              xFn(0),
        )
        .attr(
          "height",
          waterfall
            ? yFn.bandwidth() / x.length - (waterfall.padding || 0)
            : yFn.bandwidth(),
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
                : `${d[y.key]} <br/> ${column.key} ${
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

      drawing &&
        drawing.duration &&
        bars
          .transition()
          .duration(drawing.duration)
          .delay((d, idx) => i * (drawing.delay || 100) + idx * 100)
          .attr("width", d => {
            const columns = x.filter((_, idx) => idx >= i).map(c => c.key);
            return waterfall
              ? xFn(d[column.key]) - xFn(0)
              : xFn(sum(columns.map(c => d[c]))) - xFn(0);
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

    function drawVLine({ x, y, className, dashed }) {
      const verticalLine = g
        .append("line")
        .attr("class", mergeTailwindClasses(className, "line stroke-current"))
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", y)
        .attr("y2", height - marginBottom - paddingBottom)
        .attr("stroke", "currentColor")
        .attr("clip-path", "url(#clip)")
        .style("stroke-width", 1);
      dashed && verticalLine.style("stroke-dasharray", "10,7");
    }

    referenceLines.map(object => {
      object.x &&
        drawVLine({
          x:
            x.scalingFunction === "time"
              ? xFn(toDateTime({ [x.key]: object.x }))
              : xFn(object.x),
          y: marginTop,
          className: `${object.className || ""} reference-line`,
        });
    });

    const tooltipDiv = select("#root")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr("class", `tooltip ${(tooltip && tooltip.className) || ""}`);

    const xAxis = x.some(column => column.axis === "top")
      ? axisTop(xFn).ticks(x.axisTicks || 5)
      : axisBottom(xFn).ticks(x.axisTicks || 5);

    tickFormat &&
      xAxis.tickFormat(
        formatMapping[tickFormat]
          ? format(formatMapping[tickFormat])
          : format(tickFormat),
      );

    const xAxisG = g.append("g").attr("class", "axis--x axis ");

    const yAxis = direction === "left" ? axisRight(yFn) : axisLeft(yFn);
    const yAxisG = g
      .append("g")
      .attr("class", "yAxis axis")
      .attr(
        "transform",
        `translate(${direction === "left" ? width : marginLeft},0)`,
      );

    xAxisG
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height - marginBottom})`,
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
    <>
      <svg
        id={id}
        className={mergeTailwindClasses(
          `w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart h-64`,
          className || "",
        )}
      />
    </>
  );
};

BarChartStacked.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  direction: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
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

export default BarChartStacked;
