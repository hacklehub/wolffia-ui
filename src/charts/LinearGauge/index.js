import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { axisBottom } from "d3-axis";
import { select, selectAll, pointer } from "d3-selection";

import { mergeTailwindClasses } from "../../utils";

/**
 * Ideal to show % completion of tasks
 */

const LinearGauge = ({
  className,
  id,
  label,
  data = 0,
  max = 1,
  gaugeHeight = 6,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 30,
  marginBottom = 4,
  drawing = { duration: 1000 },
  tooltip,
  classNameGauge = "",
  classNameGaugeBg = "",
}) => {
  const setup = () => {
    const svg = select(`#${id}`);

    svg.selectAll("*").remove();

    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    const xFn = scaleLinear()
      .domain([0, max])
      .range([marginLeft, width - marginRight]);

    const g = svg.append("g");

    const gaugeG = g.append("g");

    const labelText = gaugeG
      .append("text")
      .attr("class", "fill-current text-lg")
      .text(label)
      .attr("text-anchor", "middle")
      .attr("x", marginLeft + (width - marginLeft - marginRight) / 2)
      .attr("y", height - marginTop);

    const bgRail = gaugeG
      .append("rect")
      .attr(
        "class",
        mergeTailwindClasses(
          "fill-current stroke-current text-gray-300 dark:text-gray-700",
          classNameGaugeBg,
        ),
      )
      .attr("x", marginLeft)
      .attr("y", height - marginBottom - gaugeHeight)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", gaugeHeight)
      .attr("ry", gaugeHeight / 2);

    const readingRect = gaugeG
      .append("rect")
      .attr(
        "class",
        mergeTailwindClasses(
          "data-rect fill-current stroke-current",
          classNameGauge,
        ),
      )
      .attr("x", marginLeft)
      .attr("y", height - marginBottom - gaugeHeight)
      .attr("width", 0)
      .attr("height", gaugeHeight)
      .attr("ry", gaugeHeight / 2)
      .on("mouseenter", function (event, d) {})
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
      .duration(drawing.duration)
      .attr("width", xFn(data) - xFn(0));

    const tooltipDiv = select("#root")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0")
      .attr("class", `tooltip ${(tooltip && tooltip.className) || ""}`);
  };

  const refreshChart = () => {
    const svg = select(`#${id}`);
    const width = +svg.style("width").split("px")[0],
      height = +svg.style("height").split("px")[0];

    const xFn = scaleLinear()
      .domain([0, max])
      .range([marginLeft, width - marginRight]);

    const readingRect = select(".data-rect")
      .transition()
      .duration(drawing.duration)
      .attr("width", xFn(data) - xFn(0));
  };

  useEffect(() => {
    setup();
  }, []);
  useEffect(() => {
    refreshChart();
    return () => {
      selectAll(".tooltip").remove();
    };
  }, [data, max]);
  return (
    <svg
      id={id}
      className={`w-full md:w-6/12 lg:w-4/12 dark:bg-gray-800 text-gray-900 dark:text-gray-50 chart  h-12 ${
        className || ""
      }`}
    />
  );
};

LinearGauge.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.number,
  className: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.number,
  max: PropTypes.number,
  gaugeHeight: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  drawing: PropTypes.shape({
    duration: PropTypes.number,
  }),
  tooltip: PropTypes.shape({
    html: PropTypes.func,
  }),
  classNameGauge: PropTypes.string,
  classNameGaugeBg: PropTypes.string,
};

export default LinearGauge;
