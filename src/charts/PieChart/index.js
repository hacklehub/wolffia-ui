import React, { useEffect } from "react";

import { select, selectAll, pointer } from "d3-selection";
import { max, min, sum } from "d3-array";
import { pie, arc } from "d3-shape";

import { interpolate } from "d3-interpolate";
const PieChart = ({
  data,
  id,
  className = "",
  classNamePoints = { key, classMap },
  width = 400,
  height = 200,
  paddingBar = 0.3,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingTop = 0,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  innerRadius = 0,
  label,
  value,
  drawing,
  labels,
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    const pieFn = pie()
      .sort(null)
      .value(d => d[value]);

    const radius = min([width / 2, height / 2]);

    const arcFn = arc()
        .innerRadius(radius * innerRadius)
        .outerRadius(radius),
      labelsArcFn = arc()
        .innerRadius(radius * labels.radius)
        .outerRadius(radius * labels.radius);

    const arcs = pieFn(data);

    const pathsG = g
      .append("g")
      .attr(
        "transform",
        `translate(${paddingLeft + marginLeft + width / 2},${
          marginTop + paddingTop + height / 2
        })`,
      )
      .on("mouseenter", function (event, d) {
        if (tooltip) {
          tooltipDiv.style("opacity", 1);
          const [bX, bY] = pointer(event, select("body"));
          tooltipDiv.style("left", `${bX + 10}px`).style("top", `${bY + 10}px`);
          tooltipDiv.html(
            tooltip && tooltip.html
              ? tooltip.html(d)
              : tooltip.keys
              ? tooltip.keys.map(key => `${key}: ${d[key] || ""}`).join("<br/>")
              : `${d.data[label]} = ${d.data[value]} `,
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

    const paths = pathsG
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr(
        "class",
        d =>
          `${
            classNamePoints.classMap[d.data[label]]
          } fill-current stroke-current`,
      )
      .attr("d", arcFn);
    drawing &&
      drawing.duration &&
      paths
        .transition()
        .duration(drawing.duration)
        .attrTween("d", function (d) {
          const i = interpolate({ startAngle: 0, endAngle: 0 }, d);
          return t => arcFn(i(t));
        });

    const tooltipDiv = select("#root")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr("class", `tooltip ${(tooltip && tooltip.className) || ""}`);
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
      className={`${className}`}
      width={width + marginLeft + marginRight + paddingLeft + paddingRight}
      height={height + marginTop + marginBottom}
    />
  );
};

export default PieChart;
