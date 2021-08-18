"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _LollipopHChart = _interopRequireDefault(require("../../charts/LollipopHChart"));

var _luxon = require("luxon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Storybook
var stories = (0, _react2.storiesOf)("Lollipop-H", module);
stories.add("Simple Lollipop Horizontal", function () {
  var data = [{
    reading: 110,
    name: "Category 1"
  }, {
    reading: 100,
    name: "Category 2"
  }, {
    reading: 80,
    name: "Category 3"
  }, {
    reading: 90,
    name: "Category 4"
  }];
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: ""
  }, "Lollipop Charts can be used to show ranking by a value.", /*#__PURE__*/_react["default"].createElement(_LollipopHChart["default"], {
    data: data,
    height: 100,
    paddingBottom: 20,
    id: "lollipop-horizontal",
    className: "text-green-500 dark:text-green-100",
    classNamePoints: "text-green-500 dark:text-green-100",
    x: {
      key: "reading",
      axisTicks: 2
    },
    y: {
      key: "name"
    },
    tooltip: {
      className: "dark:text-green-100 dark:bg-gray-500 border-white border-1 p-2 rounded"
    },
    valueMin: 0
  })));
});