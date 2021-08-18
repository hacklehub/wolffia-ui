import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, pointer, selectAll } from "d3-selection";
import { scaleTime, scaleLinear } from "d3-scale";

import { zoom } from "d3-zoom";
import { max, min, minIndex } from "d3-array";
import {
  curveStep,
  curveCatmullRom,
  curveLinear,
  line,
  symbol,
  symbolCross,
  symbolStar,
  symbolTriangle,
  symbolSquare,
  symbolWye,
  symbolDiamond,
  symbolCircle,
} from "d3-shape";
import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";

import { easeSin } from "d3-ease";
import { transition } from "d3-transition";
import { DateTime } from "luxon";

import "./styles.css";

/**
 * Display a line chart
 *
 * @param {Object} parameters All parameters
 * @param {object[]} parameters.data Data to be passed
 * @param {string} parameters.id Id of the chart
 * @param {string} parameters.className classNames to be assigned to the LineChart svg
 *
 */

const LineChart = props => {
  const {
    data = [],
    id,
    className,
    x,
    y,
    tooltip,
    zooming,
    width = 490,
    height = 200,
    paddingLeft = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingTop = 0,
    marginLeft = 40,
    marginRight = 40,
    marginTop = 40,
    marginBottom = 40,
    showGuidelines = false,
    referenceLines = [],
  } = props;

  // Todo partial stroke-dashed
  const refreshChart = async () => {
    const shapeMapping = {
      circle: symbolCircle,
      diamond: symbolDiamond,
      triangle: symbolTriangle,
      square: symbolSquare,
      cross: symbolCross,
      star: symbolStar,
      wye: symbolWye,
      default: symbolCircle,
    };

    const curveMapping = {
      rounded: curveCatmullRom,
      step: curveStep,
      line: curveLinear,
      default: curveLinear,
    };

    /**
     *
     * @param {scaleLinear} xFunction
     */
    const setDefaultXDomain = xFunction => {
      x.scalingFunction === "time"
        ? xFunction.domain([
            Number.isFinite(x.start)
              ? x.start
              : min(data.map(d => toDateTime(d))),
            Number.isFinite(x.end) ? x.end : max(data.map(d => toDateTime(d))),
          ])
        : xFunction.domain([
            Number.isFinite(x.start)
              ? x.start
              : !x.convert
              ? min(data.map(d => d[x.key]))
              : min(data.map(d => x.convert(d))),
            Number.isFinite(x.start)
              ? x.end
              : x.convert
              ? max(data.map(d => x.convert(d)))
              : max(data.map(d => d[x.key])),
          ]);
    };

    const allLeftY = y.filter(column => column.axis !== "right"),
      allRightY = y.filter(column => column.axis === "right");

    const toDateTime = d => DateTime.fromFormat(d[x.key], x.format);
    const svg = select(`#${id}`);
    // Clear svg

    svg.selectAll("*").remove();

    const xFn =
      x.scalingFunction === "time" ? scaleTime().nice() : scaleLinear();

    setDefaultXDomain(xFn);
    xFn.range([marginLeft + paddingLeft, width + marginLeft]);

    const xAxis =
      x.axis === "top"
        ? axisTop(xFn).ticks(x.axisTicks || 5)
        : axisBottom(xFn).ticks(x.axisTicks || 5);

    const g = svg.append("g");

    const minLeftYs =
        allLeftY.length > 0 &&
        Number.isFinite(min(allLeftY.map(column => column.start)))
          ? min(allLeftY.map(column => column.start))
          : min([
              ...allLeftY.map((column, minValue) =>
                min(data.map(d => d[column.key])),
              ),
            ]),
      maxLeftYs =
        allLeftY.length > 0 &&
        Number.isFinite(max(allLeftY.map(column => column.end)))
          ? max(allLeftY.map(column => column.end))
          : max([...allLeftY.map(column => max(data.map(d => d[column.key])))]),
      minTicksLeft =
        allLeftY.length > 0 && min(allLeftY.map(column => column.ticks));

    const yLeftFn =
      allLeftY.length > 0 &&
      scaleLinear()
        .domain([minLeftYs, maxLeftYs])
        .range([height + marginTop - paddingBottom, marginTop + paddingTop]);

    const yLeftAxis =
      allLeftY.length > 0 && axisLeft(yLeftFn).ticks(minTicksLeft || 5);

    const minRightYs =
        allRightY.length > 0 &&
        min([
          ...allRightY.map(column => min(data.map(d => d[column.key]))),
          ...allRightY.map(column => column.start),
        ]),
      maxRightYs =
        allRightY.length > 0 &&
        max([
          ...allRightY.map(column => max(data.map(d => d[column.key]))),
          ...allRightY.map(column => column.end),
        ]);

    const yRightFn =
      allRightY.length > 0 &&
      scaleLinear()
        .domain([minRightYs, maxRightYs])
        .range([height + marginTop - paddingBottom, marginTop + paddingTop]);

    const yRightAxis = allRightY.length > 0 && axisRight(yRightFn);

    const yLeftLabels =
      allLeftY.length > 0 &&
      allLeftY.map(column => column.axisLabel || column.key);

    const yRightLabels =
      allRightY.length > 0 &&
      allRightY
        .filter(column => column.axisLabel)
        .map(column => column.axisLabel);

    const xAxisG = g.append("g").attr("class", "axis--x axis ");

    xAxisG
      .attr(
        "transform",
        `translate(0, ${x.axis === "top" ? marginTop : height + marginTop})`,
      )
      .transition()
      .duration(400)
      .call(xAxis);

    paddingLeft &&
      xAxisG
        .append("line")
        .attr("x1", marginLeft)
        .attr("x2", marginLeft + width)
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

    x.axisLabel &&
      xAxisG
        .append("text")
        .text(x.axisLabel)
        .attr("fill", "currentColor")
        .attr(
          "x",
          x.axisLabelPosition === "right"
            ? marginLeft + width + 15
            : marginLeft + width / 2,
        )
        .attr("y", marginTop - 10)
        .style("font-size", "1.1em");

    const yLeftAxisG =
      yLeftAxis &&
      g
        .append("g")
        .attr("class", "axis axis--left-y")
        .attr("transform", `translate(${marginLeft},0)`);

    yLeftAxisG.transition().duration(400).call(yLeftAxis);

    paddingBottom &&
      yLeftAxisG
        .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", marginTop + height - paddingBottom)
        .attr("y2", marginTop + height)
        .attr("stroke", "currentColor");

    const yRightAxisG =
      yRightAxis &&
      g
        .append("g")
        .attr("class", "axis axis--right-y")
        .attr("transform", `translate(${width + marginLeft},0)`);

    yRightAxisG && yRightAxisG.call(yRightAxis);

    paddingBottom &&
      yRightAxisG &&
      yRightAxisG
        .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", marginTop + height - paddingBottom)
        .attr("y2", marginTop + height)
        .attr("stroke", "currentColor");

    yLeftLabels &&
      yLeftLabels.length > 0 &&
      yLeftAxisG
        .append("text")
        .text(yLeftLabels.join(", "))
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("x", -marginLeft)
        .attr("y", marginTop - 5)
        .style("font-size", "1.1em");

    yRightLabels &&
      yRightLabels.length > 0 &&
      yRightAxisG
        .append("text")
        .text(yRightLabels.join(", "))
        .attr("fill", "currentColor")
        .attr("x", 2)
        .attr("y", marginTop - 5)
        .style("font-size", "1.1em");

    const clipPath = svg
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", marginLeft - 4)
      .attr("y", marginTop - paddingTop - 4)
      .attr("width", width + paddingRight + 4)
      .attr("height", height + paddingBottom + 8);

    const leftG = g
      .append("g")
      .attr("class", "left-g")
      .attr("clip-path", "url(#clip)");

    const drawLeftSeries = () => {
      zooming &&
        (function () {
          selectAll(".left-series").remove();
          selectAll(".left-circles").remove();
        })();

      // Draw left axis values

      allLeftY.map(column => {
        const seriesData = data.filter(
          d => Number.isFinite(d[column.key]) || column.unknown === "zero",
        );

        const columnCurve =
          curveMapping[column.curve] || curveMapping["default"];

        const newLine = line()
          .x(d => {
            // console.log(xFn(d[x.key]));
            return x.scalingFunction === "time"
              ? xFn(toDateTime(d))
              : xFn(d[x.key]);
          })
          .y(d => yLeftFn(d[column.key] || (column.unknown === "zero" && 0)))
          .curve(columnCurve || curveLinear);

        const seriesPath = leftG
          .append("path")
          .attr("class", `left-series stroke-current ${column.className || ""}`)
          .datum(seriesData)
          .attr("fill", "none")
          .attr("clip-path", "url(#clip)")
          .attr("d", newLine);

        const leftCircles =
          column.symbol !== "none" &&
          leftG
            .selectAll(".left-g")
            .data(seriesData)
            .enter()
            .append("path")
            .attr(
              "d",
              symbol()
                .type(shapeMapping[column.symbol] || symbolCircle)
                .size(column.size || 16),
            )
            .attr("class", `left-circles ${column.className} fill-current`)
            // .attr("clip-path", "url(#clip)")
            .attr(
              "transform",
              d =>
                `translate(${
                  x.scalingFunction === "time"
                    ? xFn(toDateTime(d))
                    : xFn(d[x.key])
                },${yLeftFn(
                  d[column.key] || (column.unknown === "zero" && 0),
                )})`,
            );
      });
    };

    const rightG = g
      .append("g")
      .attr("class", "right-g")
      .attr("clip-path", "url(#clip)");

    const drawRightSeries = () => {
      zooming &&
        (function () {
          selectAll(".right-series").remove();
          selectAll(".right-circles").remove();
        })();
      allRightY.map(column => {
        const newLine = line()
          .x(d =>
            x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key]),
          )
          .y(d => yRightFn(d[column.key] || (column.unknown === "zero" && 0)))
          .curve(column.curve || curveLinear);

        const seriesData = data.filter(
          d => Number.isFinite(d[column.key]) || column.unknown === "zero",
        );
        const seriesPath = rightG
          .append("path")
          .attr(
            "class",
            `right-series stroke-current ${column.className || ""}`,
          )
          .datum(seriesData)
          .attr("fill", "none")
          .attr("clip-path", "url(#clip)")
          .attr("d", newLine);

        const circles = rightG
          .selectAll(".right-g")
          .data(seriesData)
          .enter()
          .append("path")
          .attr("clip-path", "url(#clip)")
          .attr(
            "d",
            symbol()
              .type(shapeMapping[column.symbol] || symbolCircle)
              .size(column.size || 16),
          )
          .attr("class", `right-circles ${column.className} fill-current`)
          .attr(
            "transform",
            d =>
              `translate(${
                x.scalingFunction === "time"
                  ? xFn(toDateTime(d))
                  : xFn(d[x.key])
              },${yRightFn(
                d[column.key] || (column.unknown === "zero" && 0),
              )})`,
          );
      });
    };

    const drawReferenceLines = () => {
      zooming && selectAll(".reference-line").remove();
      referenceLines.map(object => {
        // const { x, yLeft, yRight, className } = object;

        object.x &&
          drawVLine({
            x:
              x.scalingFunction === "time"
                ? xFn(toDateTime({ [x.key]: object.x }))
                : xFn(object.x),
            y: marginTop,
            className: `${object.className || ""} reference-line`,
          });

        object.yLeft &&
          (function () {
            drawHLine({
              y: yLeftFn(object.yLeft),
              x: marginLeft,
              className: `stroke-current ${object.className} reference-line`,
              direction: "right",
            });

            object.showText &&
              g
                .append("text")
                .attr(
                  "class",
                  `stroke-current ${object.className}  reference-line-text`,
                )
                .attr("x", marginLeft + paddingLeft + width - 10)
                .attr("y", yLeftFn(object.yLeft) - 5)
                .attr("font-size", "0.7em")
                .text(`y = ${object.yLeft}`);
          })();

        object.yRight &&
          drawHLine({
            y: yRightFn(object.yRight),
            x: marginLeft,
            className: `${object.className || ""} reference-line`,
            direction: "right",
          });
      });
    };

    drawLeftSeries();
    drawRightSeries();
    drawReferenceLines();

    const xValue = d =>
      x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key]);
    // Tooltips

    const tooltipDiv = select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr("class", `tooltip ${(tooltip && tooltip.className) || ""}`);

    tooltip &&
      tooltip.style &&
      Object.entries(tooltip.style).map(([key, value]) =>
        tooltipDiv.style(key, value),
      );

    function onMouseOverG(event) {
      tooltip && tooltipDiv.style("opacity", 1);
    }

    function onMouseLeave(event) {
      selectAll(".axisPointLine").remove();

      tooltip && tooltipDiv.style("opacity", "0");
    }

    function drawHLine({
      x,
      y,
      direction = "left",
      className,
      dashed = false,
    }) {
      const horizontalLine = g
        .append("line")
        .attr("class", className || "axisPointLine")
        .attr("x1", direction === "left" ? marginLeft : x)
        .attr("x2", direction === "left" ? x : width + marginLeft)
        .attr("y1", y)
        .attr("y2", y)
        .attr("clip-path", "url(#clip)")
        .attr("stroke", "#dddddd");
      dashed && horizontalLine.style("stroke-dasharray", "10,5");
    }
    function drawVLine({ x, y, className, dashed }) {
      const verticalLine = g
        .append("line")
        .attr("class", className || "axisPointLine")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", y)
        .attr("y2", height + marginTop)
        .attr("stroke", "currentColor")
        .attr("clip-path", "url(#clip)")
        .style("stroke-width", 1);
      dashed && verticalLine.style("stroke-dasharray", "10,7");
    }

    function onMouseMove(event) {
      selectAll(".axisPointLine").remove();

      const [cX, cY] = pointer(event, this);

      const xDistances = data.map(d => Math.abs(xValue(d) - cX));
      const closestPoint = minIndex(xDistances);
      const dataClosest = data[closestPoint];
      const dataLeft = allLeftY.map(column => dataClosest[column.key]);
      const dataRight = allRightY.map(column => dataClosest[column.key]);

      if (showGuidelines) {
        drawVLine({
          x: xValue(dataClosest),
          y: min([
            (yLeftFn && yLeftFn(max(dataLeft))) || marginTop + height,
            (yRightFn && yRightFn(max(dataRight))) || marginTop + height,
          ]),
          className: "axisPointLine text-gray-200 stroke-current",
          dashed: true,
        });

        dataLeft.map(
          yValue =>
            Number.isFinite(yValue) &&
            drawHLine({
              x: xValue(dataClosest),
              y: yLeftFn(yValue),
              dashed: true,
            }),
        );
        dataRight.map(
          yValue =>
            Number.isFinite(yValue) &&
            drawHLine({
              x: xValue(dataClosest),
              y: yRightFn(yValue),
              direction: "right",
              dashed: true,
            }),
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
              .join("<br/>"),
      );
    };

    tooltip &&
      svg
        .on("mouseover", onMouseOverG)
        .on("mousemove", onMouseMove)
        .on("mouseleave", onMouseLeave);
    // Todo Zoom

    const extent = [
      [marginLeft, marginTop],
      [width, height],
    ];

    if (zooming) {
      const zoomFunc = zoom()
        .scaleExtent([1, 4])
        .extent(extent)
        .translateExtent(extent)
        .on("zoom", zoomed);

      function zoomed(event) {
        xFn.range(
          [marginLeft + paddingLeft, width + marginLeft].map(d =>
            event.transform.applyX(d),
          ),
        );
        xAxisG.call(xAxis);
        drawLeftSeries();
        drawRightSeries();
        drawReferenceLines();
      }
      svg.call(zoomFunc);
    }
  };

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll(".tooltip").remove();
    };
  }, [props]);

  return (
    <svg
      id={id}
      className={`${className}`}
      width={width + marginLeft + marginRight}
      height={height + marginTop + marginBottom}
    />
  );
};

LineChart.propTypes = {
  // Data and chart choosers
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired, // Need this so that chart can be selected uniquely to a page
  // Data
  x: PropTypes.shape({
    key: PropTypes.string,
    scalingFunction: PropTypes.oneOf(["linear", "time"]),
    convert: PropTypes.func,
    axis: PropTypes.oneOf(["bottom", "top"]),
    axisTicks: PropTypes.number,
    axisLabel: PropTypes.string,
    axisLabelPosition: PropTypes.oneOf(["right, bottom"]),
    start: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    end: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }),
  y: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      axis: PropTypes.oneOf(["left", "right"]),
      start: PropTypes.number,
      end: PropTypes.number,
      ticks: PropTypes.number,
      className: PropTypes.string,
      curve: PropTypes.oneOf(["rounded", "step", "line"]),
      symbol: PropTypes.oneOf([
        "circle",
        "square",
        "star",
        "triangle",
        "wye",
        "cross",
        "diamond",
      ]),
      size: PropTypes.number,
      unknown: PropTypes.oneOf(["zero"]),
    }),
  ),

  // Styles
  className: PropTypes.string, // Tailwind classes to be added to the chart
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

  // Todo duration of transition
  zooming: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  transitionDuration: PropTypes.number,
  // Decorators
  tooltip: PropTypes.shape({
    keys: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    html: PropTypes.func,
  }),
  referenceLines: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      yLeft: PropTypes.number,
      yRight: PropTypes.number,
      className: PropTypes.string,
      showText: PropTypes.bool,
    }),
  ),
};

export default LineChart;
