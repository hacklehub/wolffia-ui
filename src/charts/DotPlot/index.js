import React, { useEffect } from "react";

import { max, min } from "d3-array";

import { select, selectAll, pointer } from "d3-selection";
import { zoom } from "d3-zoom";
import { scaleLinear, scalePoint } from "d3-scale";
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

const DotPlot = ({
  id,
  className,
  height = 300,
  data = [],
  classNameData,
  y = { key: "label" },
  x = {},
  marginTop = 40,
  marginBottom = 40,
  marginLeft = 40,
  marginRight = 40,
  paddingTop = 0,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 40,
  labelWidth = 150,
  width = 450,
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

    const g = svg.append("g");

    const xFn = scaleLinear()
      .domain([
        Number.isFinite(x.minValue)
          ? x.minValue
          : min(data.map(d => d[x.minKey])),
        Number.isFinite(x.maxValue)
          ? x.maxValue
          : max(data.map(d => d[x.maxKey])),
      ])
      .range([labelWidth, width - paddingRight]);

    const yFn = scalePoint()
      .domain(data.map(d => d[y.key]))
      // .range([height + marginTop - paddingBottom, marginTop + paddingTop])
      .range([marginTop + paddingTop, marginTop + height - paddingBottom]);

    const clipPath = svg
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", labelWidth)
      .attr("y", marginTop - paddingTop - 10)
      .attr("width", width)
      .attr("height", height + paddingBottom + 8);

    const axisClipPath = svg
      .append("clipPath")
      .attr("id", "axis-clip")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", labelWidth)
      .attr("height", height + paddingBottom);

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
      .append("line")
      .attr("clip-path", "url(#clip)")
      .attr("x1", d => xFn(d[x.minKey]))
      .attr("x2", d => xFn(d[x.minKey]))
      .attr("y1", d => yFn(d[y.key]))
      .attr("y2", d => yFn(d[y.key]))
      .attr("class", `dot-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr("x2", d => xFn(d[x.maxKey]));

    dotRowsG
      .append("path")
      .attr("class", `start-dots fill-current ${classNameData || ""} `)
      .attr("d", d => symbol(shapeMapping[shape], 100)())
      .attr(
        "transform",
        d => `translate(${xFn(d[x.minKey])},${yFn(d[y.key])})`,
      );

    dotRowsG
      .append("path")
      .attr("class", `end-dots fill-current ${classNameData || ""} `)
      .attr("d", d => symbol(shapeMapping[shape], 100)())
      .attr("transform", d => `translate(${xFn(d[x.minKey])},${yFn(d[y.key])})`)
      .transition()
      .duration(1000)
      .attr(
        "transform",
        d => `translate(${xFn(d[x.maxKey])},${yFn(d[y.key])})`,
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
        `translate(${y.axis === "right" ? marginLeft + width : labelWidth},0)`,
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
        `translate(0, ${x.axis === "top" ? marginTop : height + marginTop})`,
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
          [labelWidth, width - paddingRight].map(d =>
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
      className={`${className || ""}`}
      width={width + marginLeft + marginRight}
      height={height + marginTop + marginBottom}
    />
  );
};

export default DotPlot;
