import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles.css";

import { max, min } from "d3-array";

import { select, selectAll, pointer } from "d3-selection";
import { zoom } from "d3-zoom";
import { scaleLinear, scaleBand } from "d3-scale";
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

const DotPlot = ({
  id,
  className,
  data = [],
  y = { key: "label" },
  x = {},
  marginTop = 40,
  marginBottom = 40,
  marginLeft = 40,
  marginRight = 20,
  paddingTop = 0,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  size,
  shape = "circle",
  tooltip = {},
  zooming,
}) => {
  const refreshChart = async () => {
    const shapeMapping = {
      circle: symbolCircle,
      diamond: symbolDiamond,
      triangle: symbolTriangle,
      square: symbolSquare,
      cross: symbolCross,
      star: symbolStar,
      wye: symbolWye,
    };
    const svg = select(`#${id}`);
    // Clear svg

    svg.selectAll("*").remove();

    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    const g = svg.append("g");

    const xFn = scaleLinear()
      .domain([
        Number.isFinite(x.start) ? x.start : min(data.map(d => d[x.minKey])),
        Number.isFinite(x.end) ? x.end : max(data.map(d => d[x.maxKey])),
      ])
      .range([marginLeft, width - paddingRight - marginRight]);

    const yFn = scaleBand()
      .domain(data.map(d => d[y.key]))
      .range([marginTop + paddingTop, height - marginBottom - paddingBottom]);

    const clipPath = svg
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", marginLeft)
      .attr("y", marginTop - paddingTop - 10)
      .attr("width", width)
      .attr("height", height + paddingBottom + 8);

    const dataG = g
      .append("g")
      .attr("class", "data")
      .attr("clip-path", "url(#clip)");

    const dotRowsG = dataG
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .on("mouseenter", function (event, d) {
        tooltip && tooltipDiv.style("opacity", 1);
        const [bX, bY] = pointer(event, select("body"));
        tooltipDiv.style("left", `${bX + 10}px`).style("top", `${bY + 10}px`);
        tooltipDiv.html(
          tooltip && tooltip.html
            ? tooltip.html(d)
            : tooltip.keys
            ? tooltip.keys.map(key => `${key}: ${d[key] || ""}`).join("<br/>")
            : `${d[y.key]}: ${d[x.minKey]} to ${d[x.maxKey]}`,
        );
      })
      .on("mouseleave", function (event, d) {
        tooltip &&
          tooltipDiv
            .style("opacity", "0")
            .style("left", `0px`)
            .style("top", `0px`);
      });

    dotRowsG
      .append("polyline")
      .attr("clip-path", "url(#clip)")
      .attr(
        "class",
        mergeTailwindClasses(`fill-current stroke-0`, x.className || ""),
      )
      .attr(
        "points",
        d =>
          `${xFn(d[x.minKey])} ${yFn(d[y.key]) + yFn.bandwidth() / 2}, ${xFn(
            d[x.minKey],
          )} ${yFn(d[y.key]) + yFn.bandwidth() / 2}, ${xFn(d[x.minKey])} ${
            yFn(d[y.key]) + yFn.bandwidth() / 2
          }`,
      )
      .transition()
      .duration(1000)
      .attr(
        "points",
        d =>
          `${xFn(d[x.minKey])} ${yFn(d[y.key]) + yFn.bandwidth() / 2}, ${xFn(
            d[x.maxKey],
          )} ${
            yFn(d[y.key]) - Math.sqrt((size || 100) / 4) + yFn.bandwidth() / 2
          }, ${xFn(d[x.maxKey])} ${
            yFn(d[y.key]) + Math.sqrt((size || 100) / 4) + yFn.bandwidth() / 2
          }`,
      );

    dotRowsG
      .append("path")
      .attr(
        "class",
        mergeTailwindClasses(
          `fill-current end-dots stroke-current stroke-0`,
          x.className || "",
        ),
      )
      .attr("d", d => symbol(shapeMapping[shape], size || 100)())
      .attr(
        "transform",
        d =>
          `translate(${xFn(d[x.minKey])},${
            yFn(d[y.key]) + yFn.bandwidth() / 2
          })`,
      )
      .transition()
      .duration(1000)
      .attr(
        "transform",
        d =>
          `translate(${xFn(d[x.maxKey])},${
            yFn(d[y.key]) + yFn.bandwidth() / 2
          })`,
      );

    const redraw = () => {
      selectAll(".dot-plot-line")
        .attr("x1", d => xFn(d[x.minKey]))
        .attr("x2", d => xFn(d[x.maxKey]));

      selectAll(".start-dots").attr(
        "transform",
        d => `translate(${xFn(d[x.minKey])},${yFn(d[y.key])})`,
      );
      selectAll(".end-dots").attr(
        "transform",
        d => `translate(${xFn(d[x.maxKey])},${yFn(d[y.key])})`,
      );
    };

    const yAxis = y.axis === "right" ? axisRight(yFn) : axisLeft(yFn);

    const yAxisG = g
      .append("g")
      .attr("class", "yAxis axis")
      .attr(
        "transform",
        `translate(${y.axis === "right" ? marginLeft + width : marginLeft},0)`,
      );

    yAxisG.call(yAxis);

    paddingBottom &&
      yAxisG
        .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", marginTop + height - paddingBottom)
        .attr("y2", marginTop + height)
        .attr("stroke", "currentColor");

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

    const tooltipDiv = select("#root")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr("class", `tooltip ${(tooltip && tooltip.className) || ""}`);

    if (zooming) {
      const extent = [
        [marginLeft, marginTop],
        [width, height],
      ];

      const zoomFunc = zoom()
        .scaleExtent([1, 4])
        .extent(extent)
        .translateExtent(extent)
        .on("zoom", zoomed);

      function zoomed(event) {
        xFn.range(
          [marginLeft, width - paddingRight].map(d =>
            event.transform.applyX(d),
          ),
        );
        xAxisG.call(xAxis);
        redraw();
      }
      svg.call(zoomFunc);
    }
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
      className={`w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart  h-64 ${
        className || ""
      }`}
    />
  );
};

DotPlot.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.number,
  data: PropTypes.array,
  classNameData: PropTypes.string,
  y: PropTypes.object,
  x: PropTypes.object,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingBottom: PropTypes.number,
  width: PropTypes.number,
  shape: PropTypes.oneOf([
    "none",
    "circle",
    "square",
    "star",
    "triangle",
    "wye",
    "cross",
    "diamond",
  ]),

  tooltip: PropTypes.object,
  zooming: PropTypes.object,
};

export default DotPlot;
