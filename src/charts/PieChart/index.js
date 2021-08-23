import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { select, selectAll, pointer } from "d3-selection";
import { max, min, sum } from "d3-array";
import { pie, arc } from "d3-shape";

import { interpolate } from "d3-interpolate";
import { mergeTailwindClasses } from "../../utils";

const PieChart = ({
  data,
  id,
  className = "",
  classNamePoints = { key, classMap },
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
  tooltip,
  labels,
}) => {
  const refreshChart = () => {
    const svg = select(`#${id}`);
    svg.selectAll("*").remove();

    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    const g = svg.append("g");

    const pieFn = pie()
      .sort(null)
      .value(d => d[value]);

    const chartArea = [
      width - marginLeft - marginRight,
      height - marginTop - marginBottom,
    ];

    const radius = min(chartArea.map(a => a / 2));

    const arcFn = arc()
      .innerRadius(radius * innerRadius)
      .outerRadius(radius);

    const labelArc =
      labels &&
      labels.radius &&
      arc()
        .innerRadius(radius * labels.radius)
        .outerRadius(radius * labels.radius);

    const arcs = pieFn(data);

    const pathsG = g
      .append("g")
      .attr(
        "transform",
        `translate(${paddingLeft + marginLeft + chartArea[0] / 2},${
          marginTop + paddingTop + chartArea[1] / 2
        })`,
      );

    const paths = pathsG
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr(
        "class",
        d =>
          `${
            classNamePoints.classMap[d.data.name]
          } fill-current stroke-current`,
      )
      .attr("d", arcFn)
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
              : `${d.data.name} = ${d.data[value]} `,
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
      paths
        .transition()
        .duration(drawing.duration)
        .attrTween("d", function (d) {
          const i = interpolate({ startAngle: 0, endAngle: 0 }, d);
          return t => arcFn(i(t));
        });

    labelArc &&
      pathsG
        .selectAll("g")
        .data(arcs)
        .join("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr(
          "class",
          `${(labels && labels.className) || ``} ${
            (labels.labelsMap && labels.labelMap[labels.key]) || ``
          } fill-current`,
        )
        .text(d => (labels.text ? labels.text(d.data) : d.data[label]));

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
      className={mergeTailwindClasses(`widget md:w-3/12 h-64`, className || "")}
    />
  );
};

PieChart.propTypes = {
  id: PropTypes.string.isRequired,
  classNamePoints: PropTypes.shape({
    classMap: PropTypes.object,
  }).isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
export default PieChart;
