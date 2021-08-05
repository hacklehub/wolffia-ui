import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select } from "d3-selection";
import { max, min } from "d3-array";
import { scaleLinear } from "d3-scale";

import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";
import { color, extent, scaleOrdinal, scalePow, scaleSqrt } from "d3";

const ScatterPlot = ({
  data,
  id,
  className,
  x,
  y,
  size,
  color,
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

    const xAxis = axisBottom(xFn).ticks(x.axisTicks || 5);

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

    const yAxis = axisLeft(yFn).ticks(y.axisTicks || 5);

    g.append("g")
      .attr("class", "xAxis axis")
      .attr("transform", `translate(0, ${height + marginTop})`)
      .transition()
      .duration(400)
      .call(xAxis);

    g.append("g")
      .attr("class", "yAxis axis")
      .attr("transform", `translate(${marginLeft},0)`)
      .transition()
      .duration(400)
      .call(yAxis);

    const sizeScale =
      size &&
      (size.scale === "linear"
        ? scaleLinear()
        : size.scale === "sqrt" && scaleSqrt());

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

    // Drawing
    const pointsGroup = g.append("g");

    pointsGroup
      .selectAll(".points")
      .data(data.filter(d => !d.shape || d.shape === "circle"))
      .enter()
      .append("circle")
      .attr("cx", d => xFn(d[x.key]))
      .attr("cy", d => yFn(d[y.key]))
      .attr(
        "r",
        d =>
          (size.scale === "fixed"
            ? size.value
            : sizeScale && sizeScale(d[size.key])) || 2
      )
      .attr("fill", d =>
        d.fill || colorScale ? colorScale(d[color.key]) : "#000000"
      )
      .on("mouseover", function (e, d) {
        console.log(d);
      });

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
