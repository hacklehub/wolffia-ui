import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";

import { max, min } from "d3-array";
import { axisBottom } from "d3-axis";
import { select, selectAll, pointer } from "d3-selection";
import { arc } from "d3-shape";

import { interpolate } from "d3-interpolate";
import { mergeTailwindClasses } from "../../utils";

const RingGauge = ({
  className,
  id,
  labelKey,
  targetKey,
  dataKey,
  errorKey,
  labels,
  data = [],
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  paddingArc = 5,
  minRadius = 10,
  drawing = { duration: 1000, delay: 0 },
  startAngle = 0,
  endAngle = 270,
  tooltip,
  classNameGauge = "",
  classNameGaugeBg = "",
}) => {
  const PI = Math.PI,
    numArcs = data.length;

  const setup = () => {
    const svg = select(`#${id}`);

    svg.selectAll("*").remove();

    const g = svg.append("g");

    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    const getInnerRadius = index =>
        minRadius + (numArcs - (index + 1)) * (arcWidth + paddingArc),
      getOuterRadius = index => getInnerRadius(index) + arcWidth;

    g.attr("transform", `translate(${width / 2},${height / 2})`);

    const innerWidth = width - marginLeft - marginRight,
      innerHeight = height - marginTop - marginBottom,
      chartRadius = Math.min(innerHeight, innerWidth) / 2;

    const scale = scaleLinear()
      .domain([0, 1])
      .range([0, (endAngle / 180) * PI]);

    const arcWidth = (chartRadius - minRadius - numArcs * paddingArc) / numArcs;

    const arcFn = arc()
      .innerRadius((d, i) => getInnerRadius(i))
      .outerRadius((d, i) => getOuterRadius(i))
      .startAngle(((startAngle / 90) * PI) / 2) // Todo customize start angle
      .endAngle((d, i) => scale(d)) // Todo Customize end angle
      .cornerRadius(2);

    const backgroundArcs = g
      .append("g")
      .attr("class", `background-arcs`)
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr(
        "class",
        mergeTailwindClasses(
          ` fill-current text-gray-200 dark:text-gray-700`,
          classNameGaugeBg,
        ),
      )
      .attr("d", (d, i) => arcFn(1, i));

    const arcs = g
      .append("g")
      .attr("class", "data")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("class", d =>
        mergeTailwindClasses("data-arc fill-current ", d.className),
      )
      .attr("d", ``)
      .on("mouseenter", function (event, d) {
        tooltip &&
          tooltipDiv
            .style("opacity", 1)
            .html(
              tooltip?.html
                ? tooltip.html(d)
                : `${d[labelKey]} <br/>${d[dataKey]}/${d[targetKey]}`,
            );
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
      })
      .transition()
      .delay((d, i) => i * drawing.delay)
      .duration(drawing.duration)
      .attrTween("d", (d, i) => {
        const interpolateFn = interpolate(
          0,
          min([d[dataKey] / d[targetKey], 1]),
        );
        return t => arcFn(interpolateFn(t), i);
      });

    const labelsG =
      labels &&
      g
        .append("g")
        .attr("class", "labels")
        .selectAll(".labels")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "end")
        .attr("class", `fill-current text-xs ${labels.className || ""}`)
        .attr("x", -5)
        .attr("y", (d, i) =>
          labels?.position === "bottom"
            ? getInnerRadius(i) + arcWidth - 1
            : -getInnerRadius(i) - 2,
        )
        .text(d => d.name);

    const tooltipDiv = select("#root")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr(
        "class",
        mergeTailwindClasses("tooltip ", tooltip && tooltip.className),
      );
  };

  useEffect(() => {
    setup();
    return () => {
      selectAll(".tooltip").remove();
    };
  }, [data]);
  return (
    <svg
      id={id}
      className={`w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 widget h-64 ${
        className || ""
      }`}
    />
  );
};

export default RingGauge;
