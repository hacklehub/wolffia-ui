"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _ScatterPlot = _interopRequireDefault(require("../../charts/ScatterPlot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Storybook
var stories = (0, _react2.storiesOf)("ScatterPlots", module);
stories.add("Basic Scatterplot", function () {
  var randBetween = function randBetween(x, y) {
    return Math.floor(x + Math.random() * (y - x));
  };

  var categories = ["Category A", "Category B"];
  var colorMap = {
    "Category A": "#0099FF",
    "Category B": "#FF5252"
  };
  var data = new Array(50).fill("").map(function (v) {
    return {
      dependant: randBetween(1000, 1500),
      independant: randBetween(300, 500),
      sizeVariable: randBetween(100, 400),
      category: categories[randBetween(0, 2)]
    };
  });
  var shapeMap = {
    UDF: "square",
    LDF: "diamond"
  };
  return /*#__PURE__*/_react["default"].createElement(_ScatterPlot["default"], {
    id: "random-scatter",
    className: "ring-2",
    data: data,
    x: {
      key: "independant",
      axisTicks: 10
    },
    y: {
      key: "dependant",
      axisTicks: 10
    },
    shape: {
      key: "category",
      map: shapeMap
    },
    size: {
      key: "sizeVariable",
      min: 10,
      max: 40
    },
    color: {
      key: "category",
      map: colorMap
    },
    style: {
      opacity: "0.5"
    },
    tooltip: {
      html: function html(row) {
        return "<div class=\"m-2 p-2 rounded\" style=\"background-color: ".concat(colorMap[row.category], "\">").concat(row.sizeVariable, "</div>");
      }
    },
    width: 480,
    height: 300,
    paddingBottom: 10,
    paddingLeft: 10,
    zooming: {
      min: 0.5,
      max: 5
    }
  });
});