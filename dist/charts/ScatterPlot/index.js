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

var _d3Brush = require("d3-brush");

var _d3Zoom = require("d3-zoom");

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

var ScatterPlot = function ScatterPlot(_ref) {
  var data = _ref.data,
      id = _ref.id,
      className = _ref.className,
      x = _ref.x,
      y = _ref.y,
      size = _ref.size,
      tooltip = _ref.tooltip,
      color = _ref.color,
      shape = _ref.shape,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 500 : _ref$width,
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
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$zooming = _ref.zooming,
      zooming = _ref$zooming === void 0 ? false : _ref$zooming;

  var refreshChart = function refreshChart() {
    var svg = (0, _d3Selection.select)("#".concat(id)); // Clear svg

    svg.selectAll("*").remove();
    var g = svg.append("g");
    var xFn = (0, _d3Scale.scaleLinear)().range([marginLeft + paddingLeft, width + marginLeft]);

    var setDefaultDomain = function setDefaultDomain(xFn, yFn) {
      xFn.domain([x.start !== null && x.start !== undefined ? x.start : !x.convert ? (0, _d3Array.min)(data.map(function (d) {
        return d[x.key];
      })) : (0, _d3Array.min)(data.map(function (d) {
        return x.convert(d);
      })), x.end !== null && x.end !== undefined ? x.end : x.convert ? (0, _d3Array.max)(data.map(function (d) {
        return x.convert(d);
      })) : (0, _d3Array.max)(data.map(function (d) {
        return d[x.key];
      }))]);
      yFn.domain([y.start !== null && y.start !== undefined ? y.start : !y.convert ? (0, _d3Array.min)(data.map(function (d) {
        return d[y.key];
      })) : (0, _d3Array.min)(data.map(function (d) {
        return y.convert(d);
      })), y.end !== null && y.end !== undefined ? y.end : y.convert ? (0, _d3Array.max)(data.map(function (d) {
        return y.convert(d);
      })) : (0, _d3Array.max)(data.map(function (d) {
        return d[y.key];
      }))]);
    };

    var xAxis = (x.axis === "top" ? (0, _d3Axis.axisTop)(xFn) : (0, _d3Axis.axisBottom)(xFn)).ticks(x.axisTicks || 5);
    var yFn = (0, _d3Scale.scaleLinear)().range([height + marginTop - paddingTop - paddingBottom, marginTop + paddingTop]);
    setDefaultDomain(xFn, yFn);
    var yAxis = (y.axis === "right" ? (0, _d3Axis.axisRight)(yFn) : (0, _d3Axis.axisLeft)(yFn)).ticks(y.axisTicks || 5);
    var xAxisG = g.append("g").attr("class", "xAxis axis").attr("transform", "translate(0, ".concat(x.axis === "top" ? marginTop : height + marginTop, ")"));
    xAxisG.transition().duration(400).call(xAxis);
    paddingLeft && xAxisG.append("line").attr("x1", marginLeft).attr("x2", marginLeft + paddingLeft).attr("y1", 0).attr("y2", 0).attr("stroke", "currentColor");
    paddingRight && xAxisG.append("line").attr("x1", marginLeft + width).attr("x2", marginLeft + width + paddingRight).attr("y1", 0).attr("y2", 0).attr("stroke", "currentColor");
    var yAxisG = g.append("g").attr("class", "yAxis axis").attr("transform", "translate(".concat(y.axis === "right" ? marginLeft + width : marginLeft, ",0)"));
    yAxisG.transition().duration(400).call(yAxis);
    paddingBottom && yAxisG.append("line").attr("x1", 0).attr("x2", 0).attr("y1", marginTop + height - paddingBottom).attr("y2", marginTop + height).attr("stroke", "currentColor");
    var sizeScale = size && (0, _d3Scale.scaleLinear)();
    sizeScale && size.min && size.max && sizeScale.domain((0, _d3Array.extent)(data, function (d) {
      return d[size.key];
    })).range([size.min, size.max]);
    var colorScale = color && color.map && (0, _d3Scale.scaleOrdinal)().domain(Object.keys(color.map)).range(Object.values(color.map));
    var shapeMapping = {
      circle: _d3Shape.symbolCircle,
      diamond: _d3Shape.symbolDiamond,
      triangle: _d3Shape.symbolTriangle,
      square: _d3Shape.symbolSquare,
      cross: _d3Shape.symbolCross,
      star: _d3Shape.symbolStar,
      wye: _d3Shape.symbolWye
    };
    var shapeScale = shape && shape.map && (0, _d3Scale.scaleOrdinal)().domain(Object.keys(shape.map)).range(Object.values(shape.map).map(function (shape) {
      return shapeMapping[shape];
    })); // Todo Add brushing
    // Tooltips

    var tooltipDiv = (0, _d3Selection.select)("body").append("div").attr("id", "tooltip").style("transition-property", "opacity").style("transition-duration", "1000").style("position", "absolute");
    tooltipDiv.attr("class", "tooltip ".concat(tooltip.className || ""));
    tooltip.style && Object.entries(tooltip.style).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

      return tooltipDiv.style(key, value);
    }); // Drawing

    var pointsGroup = g.append("g");
    pointsGroup.selectAll(".points").data(data).enter().append("path").attr("class", "points").attr("d", function (d) {
      return (0, _d3Shape.symbol)(shapeScale ? shapeScale(d[shape.key]) : shapeMapping[shape["default"] || "circle"], sizeScale ? sizeScale(d[size.key]) : size["default"] || 12)();
    }).attr("fill", function (d) {
      return d.fill || colorScale ? colorScale(d[color.key]) : "#000000";
    }).attr("transform", function (d) {
      return "translate(".concat(xFn(d[x.key]), ",").concat(yFn(d[y.key]), ")");
    }).on("mouseenter", onMouseOverG).on("mousemove", onMouseMove).on("mouseleave", onMouseLeave);

    function onMouseMove(event) {
      var _pointer = (0, _d3Selection.pointer)(event, (0, _d3Selection.select)("body")),
          _pointer2 = _slicedToArray(_pointer, 2),
          bX = _pointer2[0],
          bY = _pointer2[1];

      tooltipDiv.style("left", "".concat(bX + 10, "px")).style("top", "".concat(bY + 10, "px"));
    }

    function onMouseOverG(event, row) {
      tooltip && tooltipDiv.style("opacity", 1);
      tooltipDiv.html(tooltip.html ? tooltip.html(row) : tooltip.keys ? tooltip.keys.map(function (key) {
        return "".concat(key, ": ").concat(row[key] || "");
      }).join("<br/>") : Object.entries(row).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            key = _ref5[0],
            value = _ref5[1];

        return "".concat(key, ": ").concat(value);
      }).join("<br/>"));
    }

    function onMouseLeave(event) {
      // selectAll(".axisPointLine").remove();
      tooltip && tooltipDiv.transition().duration(400).style("opacity", "0").style("padding", "0px");
    } //Add styles from style prop


    Object.entries(style).map(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          key = _ref7[0],
          value = _ref7[1];

      pointsGroup.style(key, value);
    });
    var chartExtent = [[marginLeft, marginTop], [width, height]];

    if (zooming) {
      var zoomed = function zoomed(event) {
        xFn.range([marginLeft + paddingLeft, width + marginLeft].map(function (d) {
          return event.transform.applyX(d);
        }));
        yFn.range([height + marginTop - paddingTop - paddingBottom, marginTop + paddingTop].map(function (d) {
          return event.transform.applyY(d);
        }));
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
        pointsGroup.attr("transform", event.transform);
      };

      var zoomFunc = (0, _d3Zoom.zoom)().scaleExtent([zooming.min || 1, zooming.max || 4]).extent(chartExtent).translateExtent(chartExtent).on("zoom", zoomed);
      svg.call(zoomFunc);
    }
  };

  (0, _react.useEffect)(function () {
    refreshChart();
  }, [data]);
  return /*#__PURE__*/_react["default"].createElement("svg", {
    id: id,
    className: "".concat(className),
    width: width + marginLeft + marginRight,
    height: height + marginTop + marginBottom
  });
};

ScatterPlot.propTypes = {
  className: _propTypes["default"].string,
  // Tailwind classes to be added to the chart
  id: _propTypes["default"].string.isRequired,
  data: _propTypes["default"].arrayOf(_propTypes["default"].object),
  // Styles
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  marginTop: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  paddingLeft: _propTypes["default"].number,
  paddingRight: _propTypes["default"].number,
  paddingTop: _propTypes["default"].number,
  paddingBottom: _propTypes["default"].number,
  // Zoom
  zoom: _propTypes["default"].bool
};
var _default = ScatterPlot;
exports["default"] = _default;