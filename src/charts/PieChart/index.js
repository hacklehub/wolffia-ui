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
  paddingAngle = 0,
  cornerRadius = 0,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  innerRadius = 0,
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
      .value(d => d[value])
      .padAngle(paddingAngle);

    const chartArea = [
      width - marginLeft - marginRight,
      height - marginTop - marginBottom,
    ];

    const radius = min(chartArea.map(a => a / 2));

    const arcFn = arc()
      .innerRadius(radius * innerRadius)
      .outerRadius(radius)
      .padAngle(paddingAngle)
      .cornerRadius(cornerRadius);

    const labelArc =
      labels?.radius &&
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

    const labelsG = labelArc && pathsG.append("g").attr("class", "labels");

    labelArc &&
      labelsG
        .selectAll("g")
        .data(arcs)
        .enter()
        .append("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr(
          "class",
          `${labels?.className || ``} ${
            (labels.labelsMap && labels.labelMap[labels.key]) || ``
          } fill-current`,
        )
        .text(d => (labels.text ? labels.text(d.data) : d.data[labels.key]));

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
      className={mergeTailwindClasses(
        `w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart  h-80`,
        className || "",
      )}
    />
  );
};

PieChart.propTypes = {
  id: PropTypes.string.isRequired,
  classNamePoints: PropTypes.shape({
    classMap: PropTypes.object,
  }),
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  paddingBar: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingTop: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  innerRadius: PropTypes.number,
  drawing: PropTypes.shape({
    duration: PropTypes.number,
  }),
  tooltip: PropTypes.shape({
    html: PropTypes.func,
  }),
  labels: PropTypes.shape({
    radius: PropTypes.number,
  }).isRequired,
};
export default PieChart;
