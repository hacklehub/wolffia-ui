import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, pointer, selectAll } from "d3-selection";
import { max, min } from "d3-array";
import { scaleLinear, scalePoint } from "d3-scale";

const LollipopHorizontalChart = ({
  data = [],
  valueMin,
  valueMax,
  id,
  className,
  width = 600,
  height = 400,
  marginLeft = 40,
  marginRight = 40,
  marginTop = 40,
  marginBottom = 40,
  value,
  label,
  labelWidth = 300
}) => {
  const refreshChart = () => {
    data.sort((a, b) => b[value] - a[value]);

    const xFn = scaleLinear()
      .domain([
        Number.isFinite(valueMin) ? valueMin : min(data, d => d[value]),
        Number.isFinite(valueMax) ? valueMax : max(data, d => d[value])
      ])
      .range([labelWidth, width]);

    const yFn = scalePoint()
      .domain(data.map(d => d[label]))
      .range([marginTop, marginTop + height])
      .padding(10);
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
      width={width + marginLeft + marginRight}
      height={height + marginTop + marginBottom}></svg>
  );
};

LollipopHorizontalChart.propTypes = {
  className: PropTypes.string, // Tailwind classes to be added to the chart
  data: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string.isRequired, // Need this so that chart can be selected uniquely to a page
  width: PropTypes.number,
  height: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  value: PropTypes.string,
  label: PropTypes.string
};

export default LollipopHorizontalChart;
