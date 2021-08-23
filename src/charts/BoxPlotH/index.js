import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles.css";

import { max, min } from "d3-array";

import { select, selectAll, pointer } from "d3-selection";
import { zoom } from "d3-zoom";
import { scaleLinear, scaleBand } from "d3-scale";

import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";
import { mergeTailwindClasses } from "../../utils";

const BoxPlotH = ({
  className,
  classNameData,
  classNameBoxes = "",
  data,
  id,
  paddingY = 0.2,
  marginTop = 40,
  marginBottom = 40,
  marginLeft = 40,
  marginRight = 20,
  paddingTop = 0,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  x,
  tooltip,
  y,
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    svg.selectAll("*").remove();

    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    const g = svg.append("g");

    const xFn = scaleLinear()
      .domain([
        Number.isFinite(x.min) ? x.min : min(data.map(d => d[x.minKey])),
        Number.isFinite(x.max) ? x.max : max(data.map(d => d[x.maxKey])),
      ])
      .range([marginLeft, width - paddingRight - marginRight]);

    const yFn = scaleBand()
      .domain(data.map(d => d[y.key]))
      .range([marginTop + paddingTop, height - marginBottom - paddingBottom])
      .padding(0.3);

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
      .append("line")
      .attr("clip-path", "url(#clip)")
      .attr("x1", d => xFn(d[x.minKey]))
      .attr("x2", d => xFn(d[x.minKey]))
      .attr("y1", d => yFn(d[y.key]) + yFn.bandwidth() / 2)
      .attr("y2", d => yFn(d[y.key]) + yFn.bandwidth() / 2)
      .attr("class", `box-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr("x2", d => xFn(d[x.maxKey]));

    const beginLines = dotRowsG
      .append("line")
      .attr("clip-path", "url(#clip)")
      .attr("x1", d => xFn(d[x.minKey]))
      .attr("x2", d => xFn(d[x.minKey]))
      .attr("y1", d => yFn(d[y.key]) + yFn.bandwidth() / 2)
      .attr("y2", d => yFn(d[y.key]) + yFn.bandwidth() / 2)
      .attr("class", `box-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr("y1", d => yFn(d[y.key]))
      .attr("y2", d => yFn(d[y.key]) + yFn.bandwidth());

    const midLines = dotRowsG
      .append("line")
      .attr("clip-path", "url(#clip)")
      .attr("x1", d => xFn(d[x.midKey]))
      .attr("x2", d => xFn(d[x.midKey]))
      .attr("y1", d => yFn(d[y.key]) + yFn.bandwidth() / 2)
      .attr("y2", d => yFn(d[y.key]) + yFn.bandwidth() / 2)
      .attr("class", `box-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr("y1", d => yFn(d[y.key]))
      .attr("y2", d => yFn(d[y.key]) + yFn.bandwidth());

    const endLines = dotRowsG
      .append("line")
      .attr("clip-path", "url(#clip)")
      .attr("x1", d => xFn(d[x.maxKey]))
      .attr("x2", d => xFn(d[x.maxKey]))
      .attr("y1", d => yFn(d[y.key]) + yFn.bandwidth() / 2)
      .attr("y2", d => yFn(d[y.key]) + yFn.bandwidth() / 2)
      .attr("class", `box-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr("y1", d => yFn(d[y.key]))
      .attr("y2", d => yFn(d[y.key]) + yFn.bandwidth());

    const midRects = dotRowsG
      .append("rect")
      .attr(
        "class",
        mergeTailwindClasses(
          "box-plot-box stroke-current fill-current opacity-50 ",
          classNameBoxes,
        ),
      )
      .attr("clip-path", "url(#clip)")
      .attr("x", d => xFn(d[x.boxStart]))
      .attr("y", d => yFn(d[y.key]))
      .attr("height", yFn.bandwidth())
      .transition()
      .duration(1000)
      .attr("width", d => xFn(d[x.boxEnd]) - xFn(d[x.boxStart]));

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

export default BoxPlotH;
