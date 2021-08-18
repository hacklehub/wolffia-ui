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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var LollipopHChart = function LollipopHChart(_ref) {
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
      width = _ref$width === void 0 ? 300 : _ref$width,
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
      paddingLeft = _ref$paddingLeft === void 0 ? 10 : _ref$paddingLeft,
      _ref$paddingRight = _ref.paddingRight,
      paddingRight = _ref$paddingRight === void 0 ? 0 : _ref$paddingRight,
      _ref$paddingBottom = _ref.paddingBottom,
      paddingBottom = _ref$paddingBottom === void 0 ? 50 : _ref$paddingBottom,
      _ref$paddingTop = _ref.paddingTop,
      paddingTop = _ref$paddingTop === void 0 ? 0 : _ref$paddingTop,
      _ref$tooltip = _ref.tooltip,
      tooltip = _ref$tooltip === void 0 ? {} : _ref$tooltip,
      _ref$labelWidth = _ref.labelWidth,
      labelWidth = _ref$labelWidth === void 0 ? 100 : _ref$labelWidth,
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
      return b[x.key] - a[x.key];
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
    var xFn = (0, _d3Scale.scaleLinear)().domain([Number.isFinite(valueMin) ? valueMin : (0, _d3Array.min)(data, function (d) {
      return d[x.key];
    }), Number.isFinite(valueMax) ? valueMax : (0, _d3Array.max)(data, function (d) {
      return d[x.key];
    })]).range([labelWidth + paddingLeft, paddingLeft + width]);
    var yFn = (0, _d3Scale.scalePoint)().domain(data.map(function (d) {
      return d[y.key];
    })) // .range([height + marginTop - paddingBottom, marginTop + paddingTop])
    .range([marginTop + paddingTop, marginTop + height - paddingBottom]);
    var g = svg.append("g");
    var xAxis = x.axis === "top" ? (0, _d3Axis.axisTop)(xFn).ticks(x.axisTicks || 5) : (0, _d3Axis.axisBottom)(xFn).ticks(x.axisTicks || 5);
    var xAxisG = g.append("g").attr("class", "axis--x axis ");
    xAxisG.attr("transform", "translate(0, ".concat(x.axis === "top" ? marginTop : height + marginTop, ")")).call(xAxis);
    var yAxis = y.axis === "right" ? (0, _d3Axis.axisRight)(yFn) : (0, _d3Axis.axisLeft)(yFn);
    var yAxisG = g.append("g").attr("class", "yAxis axis").attr("transform", "translate(".concat(y.axis === "right" ? marginLeft + width : labelWidth, ",0)"));
    paddingLeft && xAxisG.append("line").attr("x1", labelWidth).attr("x2", labelWidth + paddingLeft).attr("y1", 0).attr("y2", 0).attr("stroke", "currentColor");
    paddingBottom && yAxisG.append("line").attr("x1", 0).attr("x2", 0).attr("y1", marginTop + height - paddingBottom).attr("y2", marginTop + height).attr("stroke", "currentColor");
    yAxisG.call(yAxis);
    var dataGroup = g.append("g");

    var drawLinesAndCircles = function drawLinesAndCircles() {
      var pointGroup = dataGroup.selectAll(".line").data(data).enter().append("g").on("mouseover", function (event, d) {
        tooltip && tooltipDiv.style("opacity", 1);

        var _pointer = (0, _d3Selection.pointer)(event, (0, _d3Selection.select)("body")),
            _pointer2 = _slicedToArray(_pointer, 2),
            bX = _pointer2[0],
            bY = _pointer2[1];

        tooltipDiv.style("left", "".concat(bX + 10, "px")).style("top", "".concat(bY + 10, "px"));
        tooltipDiv.html(tooltip && tooltip.html ? tooltip.html(d) : tooltip.keys ? tooltip.keys.map(function (key) {
          return "".concat(key, ": ").concat(d[key] || "");
        }).join("<br/>") : "".concat(d[y.key], ": ").concat(d[x.key]));
      }).on("mouseleave", function (event, d) {
        tooltip && tooltipDiv.style("opacity", "0");
      });
      pointGroup.append("line").attr("class", "line stroke-current ".concat(classNamePoints || "", " ").concat(classNameLines || "")).attr("x1", labelWidth + paddingLeft).attr("y1", function (d) {
        return yFn(d[y.key]);
      }).attr("x2", labelWidth).attr("y2", function (d) {
        return yFn(d[y.key]);
      }).transition().duration(1000).attr("x2", function (d) {
        return xFn(d[x.key]);
      });
      pointGroup.append("path").attr("class", "symbols fill-current ".concat(classNamePoints || "", " ").concat(classNameSymbols || "")).attr("d", function (d) {
        return (0, _d3Shape.symbol)(shapeMapping[shape], 100)();
      }).attr("transform", function (d) {
        return "translate(".concat(labelWidth + paddingLeft, ",").concat(yFn(d[y.key]), ")");
      }).transition().duration(1000).attr("transform", function (d) {
        return "translate(".concat(xFn(d[x.key]), ",").concat(yFn(d[y.key]), " )");
      });
    };

    drawLinesAndCircles();
    var tooltipDiv = (0, _d3Selection.select)("#root").append("div").attr("id", "tooltip").style("position", "absolute").style("opacity", "0").attr("class", "tooltip ".concat(tooltip && tooltip.className || ""));
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

LollipopHChart.propTypes = {
  className: _propTypes["default"].string,
  // Tailwind classes to be added to the chart
  data: _propTypes["default"].arrayOf(_propTypes["default"].object),
  id: _propTypes["default"].string.isRequired,
  // Need this so that chart can be selected uniquely to a page
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  marginTop: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  value: _propTypes["default"].string,
  label: _propTypes["default"].string
};
var _default = LollipopHChart;
exports["default"] = _default;