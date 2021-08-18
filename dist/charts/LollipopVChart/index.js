"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Selection = require("d3-selection");

var _d3Array = require("d3-array");

var _d3Scale = require("d3-scale");

var _d3Shape = require("d3-shape");

var _d3Axis = require("d3-axis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var LollipopVChart = function LollipopVChart(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      valueMin = _ref.valueMin,
      valueMax = _ref.valueMax,
      id = _ref.id,
      className = _ref.className,
      classNamePoints = _ref.classNamePoints,
      classNameLines = _ref.classNameLines,
      classNameSymbols = _ref.classNameSymbols,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 240 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 200 : _ref$height,
      _ref$marginLeft = _ref.marginLeft,
      marginLeft = _ref$marginLeft === void 0 ? 40 : _ref$marginLeft,
      _ref$marginRight = _ref.marginRight,
      marginRight = _ref$marginRight === void 0 ? 40 : _ref$marginRight,
      _ref$marginTop = _ref.marginTop,
      marginTop = _ref$marginTop === void 0 ? 40 : _ref$marginTop,
      _ref$marginBottom = _ref.marginBottom,
      marginBottom = _ref$marginBottom === void 0 ? 40 : _ref$marginBottom,
      _ref$paddingLeft = _ref.paddingLeft,
      paddingLeft = _ref$paddingLeft === void 0 ? 0 : _ref$paddingLeft,
      _ref$paddingRight = _ref.paddingRight,
      paddingRight = _ref$paddingRight === void 0 ? 0 : _ref$paddingRight,
      _ref$paddingBottom = _ref.paddingBottom,
      paddingBottom = _ref$paddingBottom === void 0 ? 0 : _ref$paddingBottom,
      _ref$paddingTop = _ref.paddingTop,
      paddingTop = _ref$paddingTop === void 0 ? 0 : _ref$paddingTop,
      _ref$shape = _ref.shape,
      shape = _ref$shape === void 0 ? "circle" : _ref$shape,
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? {
    axis: "bottom",
    axisTicks: 5
  } : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? {
    axis: "left"
  } : _ref$y;

  var refreshChart = function refreshChart() {
    var svg = (0, _d3Selection.select)("#".concat(id)); // Clear svg

    svg.selectAll("*").remove();
    data.sort(function (a, b) {
      return b[y.key] - a[y.key];
    });
    var shapeMapping = {
      circle: _d3Shape.symbolCircle,
      diamond: _d3Shape.symbolDiamond,
      triangle: _d3Shape.symbolTriangle,
      square: _d3Shape.symbolSquare,
      cross: _d3Shape.symbolCross,
      star: _d3Shape.symbolStar,
      wye: _d3Shape.symbolWye
    };
    var minValue = Number.isFinite(valueMin) ? valueMin : (0, _d3Array.min)(data, function (d) {
      return d[y.key];
    }),
        maxValue = Number.isFinite(valueMax) ? valueMax : (0, _d3Array.max)(data, function (d) {
      return d[y.key];
    });
    var xFn = (0, _d3Scale.scaleBand)().domain(data.map(function (d) {
      return d[x.key];
    })).range([marginLeft + paddingLeft, paddingLeft + marginLeft + width]);
    var yFn = (0, _d3Scale.scaleLinear)().domain([minValue, maxValue]) // .range([height + marginTop - paddingBottom, marginTop + paddingTop])
    .range([marginTop + height, marginTop + paddingTop]);
    var g = svg.append("g");
    var xAxis = x.axis === "top" ? (0, _d3Axis.axisTop)(xFn) : (0, _d3Axis.axisBottom)(xFn);
    var xAxisG = g.append("g").attr("class", "axis--x axis");
    xAxisG.attr("transform", "translate(0, ".concat(x.axis === "top" ? marginTop : height + marginTop, ")")).transition().duration(1000).call(xAxis);
    var yAxis = y.axis === "right" ? (0, _d3Axis.axisRight)(yFn) : (0, _d3Axis.axisLeft)(yFn);
    var yAxisG = g.append("g").attr("class", "yAxis axis").attr("transform", "translate(".concat(y.axis === "right" ? marginLeft + width : marginLeft, ",0)"));
    paddingLeft && xAxisG.append("line").attr("x1", 0).attr("x2", paddingLeft).attr("y1", 0).attr("y2", 0).attr("stroke", "currentColor");
    paddingBottom && yAxisG.append("line").attr("x1", 0).attr("x2", 0).attr("y1", marginTop + height - paddingBottom).attr("y2", marginTop + height).attr("stroke", "currentColor");
    yAxisG.transition().duration(1000).call(yAxis);
    var dataGroup = g.append("g");

    var drawLinesAndCircles = function drawLinesAndCircles() {
      var pointGroup = dataGroup.selectAll(".line").data(data).enter().append("g");
      pointGroup.append("line").attr("class", "line stroke-current ".concat(classNamePoints || "", " ").concat(classNameLines || "")).attr("x1", function (d) {
        return xFn(d[x.key]) + xFn.bandwidth() / 2;
      }).attr("y1", function (d) {
        return yFn(minValue);
      }).attr("x2", function (d) {
        return xFn(d[x.key]) + xFn.bandwidth() / 2;
      }).attr("y2", function (d) {
        return yFn(minValue);
      }).transition().duration(1000).attr("y1", function (d) {
        return yFn(d[y.key]);
      });
      pointGroup.append("path").attr("class", "symbols fill-current ".concat(classNamePoints || "", " ").concat(classNameSymbols || "")).attr("d", function (d) {
        return (0, _d3Shape.symbol)(shapeMapping[shape], 100)();
      }).attr("transform", function (d) {
        return "translate(".concat(xFn(d[x.key]) + xFn.bandwidth() / 2, ",").concat(yFn(minValue), ")");
      }).transition().duration(1000).attr("transform", function (d) {
        return "translate(".concat(xFn(d[x.key]) + xFn.bandwidth() / 2, ",").concat(yFn(d[y.key]), " )");
      });
    };

    drawLinesAndCircles();
  };

  (0, _react.useEffect)(function () {
    refreshChart();
    return function () {
      (0, _d3Selection.selectAll)(".tooltip").remove();
    };
  }, [data]);
  return /*#__PURE__*/_react["default"].createElement("svg", {
    id: id,
    className: "".concat(className),
    width: width + marginLeft + marginRight,
    height: height + marginTop + marginBottom
  });
};

var _default = LollipopVChart;
exports["default"] = _default;