import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, pointer } from "d3-selection";
import { max, min, extent } from "d3-array";
import { scaleLinear, scaleOrdinal } from "d3-scale";

import {
  symbol,
  symbolDiamond,
  symbolCircle,
  symbolSquare,
  symbolTriangle,
  symbolWye,
  symbolCross,
  symbolStar
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
  width = 490,
  height = 200,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  style = {}
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    // Clear svg

    svg.selectAll("*").remove();

    const g = svg.append("g");

    const xFn = scaleLinear()
      .domain([
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
      ])
      .range([marginLeft, width + marginLeft]);

    const xAxis = (x.axis === "top" ? axisTop(xFn) : axisBottom(xFn)).ticks(
      x.axisTicks || 5
    );

    const yFn = scaleLinear()
      .domain([
        y.start !== null && y.start !== undefined
          ? y.start
          : !y.convert
          ? min(data.map(d => d[y.key]))
          : min(data.map(d => y.convert(d))),
        y.end !== null && y.end !== undefined
          ? y.end
          : y.convert
          ? max(data.map(d => y.convert(d)))
          : max(data.map(d => d[y.key]))
      ])
      .range([height + marginTop, marginTop]);

    const yAxis = (y.axis === "right" ? axisRight(yFn) : axisLeft(yFn)).ticks(
      y.axisTicks || 5
    );

    g.append("g")
      .attr("class", "xAxis axis")
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height + marginTop})`
      )
      .transition()
      .duration(400)
      .call(xAxis);

    g.append("g")
      .attr("class", "yAxis axis")
      .attr(
        "transform",
        `translate(${y.axis === "right" ? marginLeft + width : marginLeft},0)`
      )
      .transition()
      .duration(400)
      .call(yAxis);

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
      wye: symbolWye
    };

    const shapeScale =
      shape &&
      shape.map &&
      scaleOrdinal()
        .domain(Object.keys(shape.map))
        .range(Object.values(shape.map).map(shape => shapeMapping[shape]));

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
        tooltipDiv.style(key, value)
      );

    // Drawing
    const pointsGroup = g.append("g");

    pointsGroup
      .selectAll(".points")
      .data(data)
      .enter()
      .append("path")
      .attr(
        "d",
        // Todo other symbols
        d =>
          symbol(
            shapeScale
              ? shapeScale(d[shape.key])
              : shapeMapping[shape.default || "circle"],
            sizeScale ? sizeScale(d[size.key]) : size.default || 12
          )()
      )
      .attr("transform", d => `translate(${xFn(d[x.key])},${yFn(d[y.key])})`)
      .attr("fill", d =>
        d.fill || colorScale ? colorScale(d[color.key]) : "#000000"
      )
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
              .join("<br/>")
      );
    }

    function onMouseLeave(event) {
      // selectAll(".axisPointLine").remove();
      tooltip && tooltipDiv.style("opacity", "0");
    }

    //Add styles from style prop
    Object.entries(style).map(([key, value]) => {
      pointsGroup.style(key, value);
    });
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
  width: PropTypes.number,
  height: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number
};

export default ScatterPlot;
