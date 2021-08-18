"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _d3Scale = require("d3-scale");

var _d3Selection = require("d3-selection");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var BulletChart = function BulletChart(props) {
  var id = props.id,
      className = props.className,
      _props$data = props.data,
      data = _props$data === void 0 ? 0 : _props$data,
      _props$label = props.label,
      label = _props$label === void 0 ? "" : _props$label,
      min = props.min,
      base = props.base,
      target = props.target,
      threshold = props.threshold,
      max = props.max,
      _props$width = props.width,
      width = _props$width === void 0 ? 400 : _props$width,
      _props$labelWidth = props.labelWidth,
      labelWidth = _props$labelWidth === void 0 ? 100 : _props$labelWidth,
      _props$height = props.height,
      height = _props$height === void 0 ? 50 : _props$height;

  var refreshChart = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var svg, xFn, g;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              svg = (0, _d3Selection.select)("#".concat(id)); // Clear svg

              svg.selectAll("*").remove();
              xFn = (0, _d3Scale.scaleLinear)().domain([min, max]).range([labelWidth, width]);
              g = svg.append("g");
              g.append("text").text(label).attr("x", 10).attr("y", height - 5);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function refreshChart() {
      return _ref.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    console.log("Here");
    refreshChart();
    return function () {
      (0, _d3Selection.selectAll)(".tooltip").remove();
    };
  }, [props]);
  return /*#__PURE__*/_react["default"].createElement("svg", {
    id: id,
    className: "".concat(className || ""),
    width: width,
    height: height
  });
};

var _default = BulletChart;
exports["default"] = _default;