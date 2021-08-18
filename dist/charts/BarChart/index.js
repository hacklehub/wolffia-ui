"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _d3Scale = require("d3-scale");

var _d = require("d3");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BarChart = function BarChart(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      id = _ref.id,
      className = _ref.className,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 490 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 200 : _ref$height,
      _ref$paddingLeft = _ref.paddingLeft,
      paddingLeft = _ref$paddingLeft === void 0 ? 0 : _ref$paddingLeft,
      _ref$paddingRight = _ref.paddingRight,
      paddingRight = _ref$paddingRight === void 0 ? 0 : _ref$paddingRight,
      _ref$paddingBottom = _ref.paddingBottom,
      paddingBottom = _ref$paddingBottom === void 0 ? 0 : _ref$paddingBottom,
      _ref$paddingTop = _ref.paddingTop,
      paddingTop = _ref$paddingTop === void 0 ? 0 : _ref$paddingTop,
      _ref$marginLeft = _ref.marginLeft,
      marginLeft = _ref$marginLeft === void 0 ? 40 : _ref$marginLeft,
      _ref$marginRight = _ref.marginRight,
      marginRight = _ref$marginRight === void 0 ? 40 : _ref$marginRight,
      _ref$marginTop = _ref.marginTop,
      marginTop = _ref$marginTop === void 0 ? 40 : _ref$marginTop,
      _ref$marginBottom = _ref.marginBottom,
      marginBottom = _ref$marginBottom === void 0 ? 40 : _ref$marginBottom,
      _ref$referenceLines = _ref.referenceLines,
      referenceLines = _ref$referenceLines === void 0 ? [] : _ref$referenceLines,
      x = _ref.x,
      y = _ref.y;

  var refreshChart = function refreshChart() {
    var svg = select("#".concat(id));
    svg.selectAll("*").remove();
    var xFn = (0, _d3Scale.scaleLinear)().domain([Number.isFinite(x.start) ? x.start : min(data.map(function (d) {
      return d[x.key];
    })), Number.isFinite(x.end) ? x.end : (0, _d.max)(data.map(function (d) {
      return d[x.key];
    }))]).range([marginLeft + paddingLeft, width + marginLeft]);
    var xAxis = x.axis === "top" ? axisTop(xFn).ticks(x.axisTicks || 5) : axisBottom(xFn).ticks(x.axisTicks || 5);
    var g = svg.append("g");
  };

  useEffect(function () {
    refreshChart();
    return function () {
      selectAll(".tooltip").remove();
    };
  }, [props]);
  return /*#__PURE__*/_react["default"].createElement("svg", {
    id: id,
    className: "".concat(className),
    width: width + marginLeft + marginRight,
    height: height + marginTop + marginBottom
  });
};

var _default = BarChart;
exports["default"] = _default;