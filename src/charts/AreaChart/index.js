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
  area,
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

import { transition } from "d3-transition";
import { DateTime } from "luxon";

import "./styles.css";
import { easeLinear } from "d3-ease";

import { mergeTailwindClasses } from "../../utils";

const AreaChart = ({
  data = [],
  id,
  className,
  x,
  y,
  tooltip,
  drawing = {},
  zooming,
  paddingLeft = 0,
  paddingRight = 0,
  paddingBottom = 0,
  paddingTop = 0,
  marginLeft = 40,
  marginRight = 20,
  marginTop = 40,
  marginBottom = 40,
  showGuidelines = false,
  referenceLines = [],
}) => {};
