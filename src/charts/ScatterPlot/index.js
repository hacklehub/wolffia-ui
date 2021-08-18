import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, pointer, selectAll } from "d3-selection";
import { max, min, extent } from "d3-array";
import { scaleLinear, scaleOrdinal } from "d3-scale";

import { brush } from "d3-brush";

import { zoom } from "d3-zoom";
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

const ScatterPlot = ({
  data,
  id,
  className,
  x,
  y,
  size,
  tooltip,
  color,
  shape,
  width = 500,
  height = 200,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingTop = 0,
  style = {},
  zooming = false,
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    // Clear svg

    svg.selectAll("*").remove();

    const g = svg.append("g");

    const xFn = scaleLinear().range([
      marginLeft + paddingLeft,
      width + marginLeft,
    ]);

    const setDefaultDomain = (xFn, yFn) => {
      xFn.domain([
        x.start !== null && x.start !== undefined
          ? x.start
          : !x.convert
          ? min(data.map(d => d[x.key]))
          : min(data.map(d => x.convert(d))),
        x.end !== null && x.end !== undefined
          ? x.end
          : x.convert
          ? max(data.map(d => x.convert(d)))
          : max(data.map(d => d[x.key])),
      ]);

      yFn.domain([
        y.start !== null && y.start !== undefined
          ? y.start
          : !y.convert
          ? min(data.map(d => d[y.key]))
          : min(data.map(d => y.convert(d))),
        y.end !== null && y.end !== undefined
          ? y.end
          : y.convert
          ? max(data.map(d => y.convert(d)))
          : max(data.map(d => d[y.key])),
      ]);
    };

    const xAxis = (x.axis === "top" ? axisTop(xFn) : axisBottom(xFn)).ticks(
      x.axisTicks || 5,
    );

    const yFn = scaleLinear().range([
      height + marginTop - paddingTop - paddingBottom,
      marginTop + paddingTop,
    ]);

    setDefaultDomain(xFn, yFn);
    const yAxis = (y.axis === "right" ? axisRight(yFn) : axisLeft(yFn)).ticks(
      y.axisTicks || 5,
    );

    const xAxisG = g
      .append("g")
      .attr("class", "xAxis axis")
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height + marginTop})`,
      );

    xAxisG.transition().duration(400).call(xAxis);

    paddingLeft &&
      xAxisG
        .append("line")
        .attr("x1", marginLeft)
        .attr("x2", marginLeft + paddingLeft)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", "currentColor");

    paddingRight &&
      xAxisG
        .append("line")
        .attr("x1", marginLeft + width)
        .attr("x2", marginLeft + width + paddingRight)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", "currentColor");

    const yAxisG = g
      .append("g")
      .attr("class", "yAxis axis")
      .attr(
        "transform",
        `translate(${y.axis === "right" ? marginLeft + width : marginLeft},0)`,
      );

    yAxisG.transition().duration(400).call(yAxis);
    paddingBottom &&
      yAxisG
        .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", marginTop + height - paddingBottom)
        .attr("y2", marginTop + height)
        .attr("stroke", "currentColor");

    const sizeScale = size && scaleLinear();

    sizeScale &&
      size.min &&
      size.max &&
      sizeScale
        .domain(extent(data, d => d[size.key]))
        .range([size.min, size.max]);

    const colorScale =
      color &&
      color.map &&
      scaleOrdinal()
        .domain(Object.keys(color.map))
        .range(Object.values(color.map));

    const shapeMapping = {
      circle: symbolCircle,
      diamond: symbolDiamond,
      triangle: symbolTriangle,
      square: symbolSquare,
      cross: symbolCross,
      star: symbolStar,
      wye: symbolWye,
    };

    const shapeScale =
      shape &&
      shape.map &&
      scaleOrdinal()
        .domain(Object.keys(shape.map))
        .range(Object.values(shape.map).map(shape => shapeMapping[shape]));

    // Todo Add brushing

    // Tooltips
    const tooltipDiv = select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("transition-property", "opacity")
      .style("transition-duration", "1000")
      .style("position", "absolute");

    tooltipDiv.attr("class", `tooltip ${tooltip.className || ""}`);
    tooltip.style &&
      Object.entries(tooltip.style).map(([key, value]) =>
        tooltipDiv.style(key, value),
      );

    // Drawing
    const pointsGroup = g.append("g");

    pointsGroup
      .selectAll(".points")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "points")
      .attr("d", d =>
        symbol(
          shapeScale
            ? shapeScale(d[shape.key])
            : shapeMapping[shape.default || "circle"],
          sizeScale ? sizeScale(d[size.key]) : size.default || 12,
        )(),
      )
      .attr("fill", d =>
        d.fill || colorScale ? colorScale(d[color.key]) : "#000000",
      )
      .attr("transform", d => `translate(${xFn(d[x.key])},${yFn(d[y.key])})`)
      .on("mouseenter", onMouseOverG)
      .on("mousemove", onMouseMove)
      .on("mouseleave", onMouseLeave);

    function onMouseMove(event) {
      const [bX, bY] = pointer(event, select("body"));
      tooltipDiv.style("left", `${bX + 10}px`).style("top", `${bY + 10}px`);
    }

    function onMouseOverG(event, row) {
      tooltip && tooltipDiv.style("opacity", 1);
      tooltipDiv.html(
        tooltip.html
          ? tooltip.html(row)
          : tooltip.keys
          ? tooltip.keys.map(key => `${key}: ${row[key] || ""}`).join("<br/>")
          : Object.entries(row)
              .map(([key, value]) => `${key}: ${value}`)
              .join("<br/>"),
      );
    }

    function onMouseLeave(event) {
      // selectAll(".axisPointLine").remove();
      tooltip &&
        tooltipDiv
          .transition()
          .duration(400)
          .style("opacity", "0")
          .style("padding", "0px");
    }

    //Add styles from style prop
    Object.entries(style).map(([key, value]) => {
      pointsGroup.style(key, value);
    });

    const chartExtent = [
      [marginLeft, marginTop],
      [width, height],
    ];

    if (zooming) {
      const zoomFunc = zoom()
        .scaleExtent([zooming.min || 1, zooming.max || 4])
        .extent(chartExtent)
        .translateExtent(chartExtent)
        .on("zoom", zoomed);

      function zoomed(event) {
        xFn.range(
          [marginLeft + paddingLeft, width + marginLeft].map(d =>
            event.transform.applyX(d),
          ),
        );

        yFn.range(
          [
            height + marginTop - paddingTop - paddingBottom,
            marginTop + paddingTop,
          ].map(d => event.transform.applyY(d)),
        );
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        pointsGroup.attr("transform", event.transform);
      }
      svg.call(zoomFunc);
    }
  };

  useEffect(() => {
    refreshChart();
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

ScatterPlot.propTypes = {
  className: PropTypes.string, // Tailwind classes to be added to the chart
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  // Styles
  width: PropTypes.number,
  height: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  // Zoom
  zoom: PropTypes.bool,
};

export default ScatterPlot;
