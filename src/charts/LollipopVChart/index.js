import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { select, selectAll } from "d3-selection";
import { max, min } from "d3-array";
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
