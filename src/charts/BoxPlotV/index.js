import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles.css";

import { max, min } from "d3-array";

import { select, selectAll, pointer } from "d3-selection";
import { zoom } from "d3-zoom";
import { scaleLinear, scaleBand } from "d3-scale";

import { axisBottom, axisTop, axisLeft, axisRight } from "d3-axis";
import { mergeTailwindClasses } from "../../utils";

const BoxPlotV = ({
  className,
  classNameData,
  classNameBoxes = "",
  data,
  id,
  paddingBar = 0.2,
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

    const xFn = scaleBand()
      .domain(data.map(d => d[x.key]))
      .range([marginLeft + paddingLeft, width - marginRight - paddingRight])
      .padding(paddingBar);

    const yFn = scaleLinear()
      .domain([
        Number.isFinite(y.min) ? y.min : min(data.map(d => d[y.minKey])),
        Number.isFinite(y.max) ? y.max : max(data.map(d => d[y.maxKey])),
      ])
      .range([height - marginBottom - paddingBottom, paddingTop + marginTop]);

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
        if (tooltip) {
          tooltipDiv.style("opacity", 1);
          const [bX, bY] = pointer(event, select("body"));
          tooltipDiv.style("left", `${bX + 10}px`).style("top", `${bY + 10}px`);
          tooltipDiv.html(
            tooltip?.html
              ? tooltip.html(d)
              : `min: ${d[y.minKey].toFixed(0)} <br/> range: ${+d[
                  y.boxStart
                ].toFixed(0)} to ${+d[y.boxEnd].toFixed(0)} <br/> mid: ${d[
                  y.midKey
                ].toFixed(0)} <br/> max: ${d[y.maxKey].toFixed(0)} `,
          );
        }
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
      .attr("x1", d => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr("x2", d => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr("y1", d => yFn(d[y.minKey]))
      .attr("y2", d => yFn(d[y.minKey]))
      .attr("class", `box-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr("y2", d => yFn(d[y.maxKey]));

    const beginLines = dotRowsG
      .append("line")
      .attr("clip-path", "url(#clip)")
      .attr("x1", d => xFn(d[x.key]))
      .attr("x2", d => xFn(d[x.key]))
      .attr("y1", d => yFn(d[y.minKey]))
      .attr("y2", d => yFn(d[y.minKey]))
      .attr("class", `box-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr("x1", d => xFn(d[x.key]))
      .attr("x2", d => xFn(d[x.key]) + xFn.bandwidth());

    const midLines = dotRowsG
      .append("line")
      .attr("clip-path", "url(#clip)")
      .attr("y1", d => yFn(d[y.midKey]))
      .attr("y2", d => yFn(d[y.midKey]))
      .attr("x1", d => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr("x2", d => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr("class", `box-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr("x1", d => xFn(d[x.key]))
      .attr("x2", d => xFn(d[x.key]) + xFn.bandwidth());

    const endLines = dotRowsG
      .append("line")
      .attr("clip-path", "url(#clip)")
      .attr("y1", d => yFn(d[y.maxKey]))
      .attr("y2", d => yFn(d[y.maxKey]))
      .attr("x1", d => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr("x2", d => xFn(d[x.key]) + xFn.bandwidth() / 2)
      .attr("class", `box-plot-line stroke-current ${classNameData || ``}`)
      .transition()
      .duration(1000)
      .attr("x1", d => xFn(d[x.key]))
      .attr("x2", d => xFn(d[x.key]) + xFn.bandwidth());

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
      .attr("y", d => height - marginBottom - paddingBottom)
      .attr("x", d => xFn(d[x.key]))
      .attr("width", xFn.bandwidth())
      .transition()
      .duration(1000)
      .attr("y", d => yFn(d[y.boxEnd]))
      .attr("height", d => yFn(d[y.boxStart]) - yFn(d[y.boxEnd]));

    const tooltipDiv = select("#root")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr("class", `tooltip ${(tooltip && tooltip.className) || ""}`);

    const yAxis = y.axis === "right" ? axisRight(yFn) : axisLeft(yFn);

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
        `w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart h-64`,
        className || "",
      )}
    />
  );
};

export default BoxPlotV;
