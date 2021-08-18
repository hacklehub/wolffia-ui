"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Selection = require("d3-selection");

var _d3Scale = require("d3-scale");

var _d3Zoom = require("d3-zoom");

var _d3Array = require("d3-array");

var _d3Shape = require("d3-shape");

var _d3Axis = require("d3-axis");

var _d3Ease = require("d3-ease");

var _d3Transition = require("d3-transition");

var _luxon = require("luxon");

require("./styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Display a line chart
 *
 * @param {Object} parameters All parameters
 * @param {object[]} parameters.data Data to be passed
 * @param {string} parameters.id Id of the chart
 * @param {string} parameters.className classNames to be assigned to the LineChart svg
 *
 */
var LineChart = function LineChart(props) {
  var _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      id = props.id,
      className = props.className,
      x = props.x,
      y = props.y,
      tooltip = props.tooltip,
      zooming = props.zooming,
      _props$width = props.width,
      width = _props$width === void 0 ? 490 : _props$width,
      _props$height = props.height,
      height = _props$height === void 0 ? 200 : _props$height,
      _props$paddingLeft = props.paddingLeft,
      paddingLeft = _props$paddingLeft === void 0 ? 0 : _props$paddingLeft,
      _props$paddingRight = props.paddingRight,
      paddingRight = _props$paddingRight === void 0 ? 0 : _props$paddingRight,
      _props$paddingBottom = props.paddingBottom,
      paddingBottom = _props$paddingBottom === void 0 ? 0 : _props$paddingBottom,
      _props$paddingTop = props.paddingTop,
      paddingTop = _props$paddingTop === void 0 ? 0 : _props$paddingTop,
      _props$marginLeft = props.marginLeft,
      marginLeft = _props$marginLeft === void 0 ? 40 : _props$marginLeft,
      _props$marginRight = props.marginRight,
      marginRight = _props$marginRight === void 0 ? 40 : _props$marginRight,
      _props$marginTop = props.marginTop,
      marginTop = _props$marginTop === void 0 ? 40 : _props$marginTop,
      _props$marginBottom = props.marginBottom,
      marginBottom = _props$marginBottom === void 0 ? 40 : _props$marginBottom,
      _props$showGuidelines = props.showGuidelines,
      showGuidelines = _props$showGuidelines === void 0 ? false : _props$showGuidelines,
      _props$referenceLines = props.referenceLines,
      referenceLines = _props$referenceLines === void 0 ? [] : _props$referenceLines; // Todo partial stroke-dashed

  var refreshChart = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var shapeMapping, curveMapping, setDefaultXDomain, allLeftY, allRightY, toDateTime, svg, xFn, xAxis, g, minLeftYs, maxLeftYs, minTicksLeft, yLeftFn, yLeftAxis, minRightYs, maxRightYs, yRightFn, yRightAxis, yLeftLabels, yRightLabels, xAxisG, yLeftAxisG, yRightAxisG, clipPath, leftG, drawLeftSeries, rightG, drawRightSeries, drawReferenceLines, xValue, tooltipDiv, onMouseOverG, onMouseLeave, drawHLine, drawVLine, onMouseMove, moveTooltip, extent, zoomed, zoomFunc;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onMouseMove = function _onMouseMove(event) {
                (0, _d3Selection.selectAll)(".axisPointLine").remove();

                var _pointer = (0, _d3Selection.pointer)(event, this),
                    _pointer2 = _slicedToArray(_pointer, 2),
                    cX = _pointer2[0],
                    cY = _pointer2[1];

                var xDistances = data.map(function (d) {
                  return Math.abs(xValue(d) - cX);
                });
                var closestPoint = (0, _d3Array.minIndex)(xDistances);
                var dataClosest = data[closestPoint];
                var dataLeft = allLeftY.map(function (column) {
                  return dataClosest[column.key];
                });
                var dataRight = allRightY.map(function (column) {
                  return dataClosest[column.key];
                });

                if (showGuidelines) {
                  drawVLine({
                    x: xValue(dataClosest),
                    y: (0, _d3Array.min)([yLeftFn && yLeftFn((0, _d3Array.max)(dataLeft)) || marginTop + height, yRightFn && yRightFn((0, _d3Array.max)(dataRight)) || marginTop + height]),
                    className: "axisPointLine text-gray-200 stroke-current",
                    dashed: true
                  });
                  dataLeft.map(function (yValue) {
                    return Number.isFinite(yValue) && drawHLine({
                      x: xValue(dataClosest),
                      y: yLeftFn(yValue),
                      dashed: true
                    });
                  });
                  dataRight.map(function (yValue) {
                    return Number.isFinite(yValue) && drawHLine({
                      x: xValue(dataClosest),
                      y: yRightFn(yValue),
                      direction: "right",
                      dashed: true
                    });
                  });
                }

                tooltip && moveTooltip(event, dataClosest);
              };

              drawVLine = function _drawVLine(_ref5) {
                var x = _ref5.x,
                    y = _ref5.y,
                    className = _ref5.className,
                    dashed = _ref5.dashed;
                var verticalLine = g.append("line").attr("class", className || "axisPointLine").attr("x1", x).attr("x2", x).attr("y1", y).attr("y2", height + marginTop).attr("stroke", "currentColor").attr("clip-path", "url(#clip)").style("stroke-width", 1);
                dashed && verticalLine.style("stroke-dasharray", "10,7");
              };

              drawHLine = function _drawHLine(_ref4) {
                var x = _ref4.x,
                    y = _ref4.y,
                    _ref4$direction = _ref4.direction,
                    direction = _ref4$direction === void 0 ? "left" : _ref4$direction,
                    className = _ref4.className,
                    _ref4$dashed = _ref4.dashed,
                    dashed = _ref4$dashed === void 0 ? false : _ref4$dashed;
                var horizontalLine = g.append("line").attr("class", className || "axisPointLine").attr("x1", direction === "left" ? marginLeft : x).attr("x2", direction === "left" ? x : width + marginLeft).attr("y1", y).attr("y2", y).attr("clip-path", "url(#clip)").attr("stroke", "#dddddd");
                dashed && horizontalLine.style("stroke-dasharray", "10,5");
              };

              onMouseLeave = function _onMouseLeave(event) {
                (0, _d3Selection.selectAll)(".axisPointLine").remove();
                tooltip && tooltipDiv.style("opacity", "0");
              };

              onMouseOverG = function _onMouseOverG(event) {
                tooltip && tooltipDiv.style("opacity", 1);
              };

              shapeMapping = {
                circle: _d3Shape.symbolCircle,
                diamond: _d3Shape.symbolDiamond,
                triangle: _d3Shape.symbolTriangle,
                square: _d3Shape.symbolSquare,
                cross: _d3Shape.symbolCross,
                star: _d3Shape.symbolStar,
                wye: _d3Shape.symbolWye,
                "default": _d3Shape.symbolCircle
              };
              curveMapping = {
                rounded: _d3Shape.curveCatmullRom,
                step: _d3Shape.curveStep,
                line: _d3Shape.curveLinear,
                "default": _d3Shape.curveLinear
              };
              /**
               *
               * @param {scaleLinear} xFunction
               */

              setDefaultXDomain = function setDefaultXDomain(xFunction) {
                x.scalingFunction === "time" ? xFunction.domain([Number.isFinite(x.start) ? x.start : (0, _d3Array.min)(data.map(function (d) {
                  return toDateTime(d);
                })), Number.isFinite(x.end) ? x.end : (0, _d3Array.max)(data.map(function (d) {
                  return toDateTime(d);
                }))]) : xFunction.domain([Number.isFinite(x.start) ? x.start : !x.convert ? (0, _d3Array.min)(data.map(function (d) {
                  return d[x.key];
                })) : (0, _d3Array.min)(data.map(function (d) {
                  return x.convert(d);
                })), Number.isFinite(x.start) ? x.end : x.convert ? (0, _d3Array.max)(data.map(function (d) {
                  return x.convert(d);
                })) : (0, _d3Array.max)(data.map(function (d) {
                  return d[x.key];
                }))]);
              };

              allLeftY = y.filter(function (column) {
                return column.axis !== "right";
              }), allRightY = y.filter(function (column) {
                return column.axis === "right";
              });

              toDateTime = function toDateTime(d) {
                return _luxon.DateTime.fromFormat(d[x.key], x.format);
              };

              svg = (0, _d3Selection.select)("#".concat(id)); // Clear svg

              svg.selectAll("*").remove();
              xFn = x.scalingFunction === "time" ? (0, _d3Scale.scaleTime)().nice() : (0, _d3Scale.scaleLinear)();
              setDefaultXDomain(xFn);
              xFn.range([marginLeft + paddingLeft, width + marginLeft]);
              xAxis = x.axis === "top" ? (0, _d3Axis.axisTop)(xFn).ticks(x.axisTicks || 5) : (0, _d3Axis.axisBottom)(xFn).ticks(x.axisTicks || 5);
              g = svg.append("g");
              minLeftYs = allLeftY.length > 0 && Number.isFinite((0, _d3Array.min)(allLeftY.map(function (column) {
                return column.start;
              }))) ? (0, _d3Array.min)(allLeftY.map(function (column) {
                return column.start;
              })) : (0, _d3Array.min)(_toConsumableArray(allLeftY.map(function (column, minValue) {
                return (0, _d3Array.min)(data.map(function (d) {
                  return d[column.key];
                }));
              }))), maxLeftYs = allLeftY.length > 0 && Number.isFinite((0, _d3Array.max)(allLeftY.map(function (column) {
                return column.end;
              }))) ? (0, _d3Array.max)(allLeftY.map(function (column) {
                return column.end;
              })) : (0, _d3Array.max)(_toConsumableArray(allLeftY.map(function (column) {
                return (0, _d3Array.max)(data.map(function (d) {
                  return d[column.key];
                }));
              }))), minTicksLeft = allLeftY.length > 0 && (0, _d3Array.min)(allLeftY.map(function (column) {
                return column.ticks;
              }));
              yLeftFn = allLeftY.length > 0 && (0, _d3Scale.scaleLinear)().domain([minLeftYs, maxLeftYs]).range([height + marginTop - paddingBottom, marginTop + paddingTop]);
              yLeftAxis = allLeftY.length > 0 && (0, _d3Axis.axisLeft)(yLeftFn).ticks(minTicksLeft || 5);
              minRightYs = allRightY.length > 0 && (0, _d3Array.min)([].concat(_toConsumableArray(allRightY.map(function (column) {
                return (0, _d3Array.min)(data.map(function (d) {
                  return d[column.key];
                }));
              })), _toConsumableArray(allRightY.map(function (column) {
                return column.start;
              })))), maxRightYs = allRightY.length > 0 && (0, _d3Array.max)([].concat(_toConsumableArray(allRightY.map(function (column) {
                return (0, _d3Array.max)(data.map(function (d) {
                  return d[column.key];
                }));
              })), _toConsumableArray(allRightY.map(function (column) {
                return column.end;
              }))));
              yRightFn = allRightY.length > 0 && (0, _d3Scale.scaleLinear)().domain([minRightYs, maxRightYs]).range([height + marginTop - paddingBottom, marginTop + paddingTop]);
              yRightAxis = allRightY.length > 0 && (0, _d3Axis.axisRight)(yRightFn);
              yLeftLabels = allLeftY.length > 0 && allLeftY.map(function (column) {
                return column.axisLabel;
              });
              yRightLabels = allRightY.length > 0 && allRightY.filter(function (column) {
                return column.axisLabel;
              }).map(function (column) {
                return column.axisLabel;
              });
              xAxisG = g.append("g").attr("class", "axis--x axis ");
              xAxisG.attr("transform", "translate(0, ".concat(x.axis === "top" ? marginTop : height + marginTop, ")")).transition().duration(400).call(xAxis);
              paddingLeft && xAxisG.append("line").attr("x1", marginLeft).attr("x2", marginLeft + width).attr("y1", 0).attr("y2", 0).attr("stroke", "currentColor");
              paddingRight && xAxisG.append("line").attr("x1", marginLeft + width).attr("x2", marginLeft + width + paddingRight).attr("y1", 0).attr("y2", 0).attr("stroke", "currentColor");
              x.axisLabel && xAxisG.append("text").text(x.axisLabel).attr("fill", "currentColor").attr("x", x.axisLabelPosition === "right" ? marginLeft + width + 15 : marginLeft + width / 2).attr("y", marginTop - 10).style("font-size", "1.1em");
              yLeftAxisG = yLeftAxis && g.append("g").attr("class", "axis axis--left-y").attr("transform", "translate(".concat(marginLeft, ",0)"));
              yLeftAxisG.transition().duration(400).call(yLeftAxis);
              paddingBottom && yLeftAxisG.append("line").attr("x1", 0).attr("x2", 0).attr("y1", marginTop + height - paddingBottom).attr("y2", marginTop + height).attr("stroke", "currentColor");
              yRightAxisG = yRightAxis && g.append("g").attr("class", "axis axis--right-y").attr("transform", "translate(".concat(width + marginLeft, ",0)"));
              yRightAxisG && yRightAxisG.call(yRightAxis);
              paddingBottom && yRightAxisG && yRightAxisG.append("line").attr("x1", 0).attr("x2", 0).attr("y1", marginTop + height - paddingBottom).attr("y2", marginTop + height).attr("stroke", "currentColor");
              yLeftLabels && yLeftLabels.length > 0 && yLeftAxisG.append("text").text(yLeftLabels.join(", ")).attr("fill", "currentColor").attr("text-anchor", "start").attr("x", -marginLeft).attr("y", marginTop - 5).style("font-size", "1.1em");
              yRightLabels && yRightLabels.length > 0 && yRightAxisG.append("text").text(yRightLabels.join(", ")).attr("fill", "currentColor").attr("x", 2).attr("y", marginTop - 5).style("font-size", "1.1em");
              clipPath = svg.append("clipPath").attr("id", "clip").append("rect").attr("x", marginLeft - 4).attr("y", marginTop - paddingTop - 4).attr("width", width + paddingRight + 4).attr("height", height + paddingBottom + 8);
              leftG = g.append("g").attr("class", "left-g").attr("clip-path", "url(#clip)");

              drawLeftSeries = function drawLeftSeries() {
                zooming && function () {
                  (0, _d3Selection.selectAll)(".left-series").remove();
                  (0, _d3Selection.selectAll)(".left-circles").remove();
                }(); // Draw left axis values

                allLeftY.map(function (column) {
                  var seriesData = data.filter(function (d) {
                    return Number.isFinite(d[column.key]) || column.unknown === "zero";
                  });
                  var columnCurve = curveMapping[column.curve] || curveMapping["default"];
                  var newLine = (0, _d3Shape.line)().x(function (d) {
                    // console.log(xFn(d[x.key]));
                    return x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key]);
                  }).y(function (d) {
                    return yLeftFn(d[column.key] || column.unknown === "zero" && 0);
                  }).curve(columnCurve || _d3Shape.curveLinear);
                  var seriesPath = leftG.append("path").attr("class", "left-series stroke-current ".concat(column.className || "")).datum(seriesData).attr("fill", "none").attr("clip-path", "url(#clip)").attr("d", newLine);
                  var leftCircles = column.symbol !== "none" && leftG.selectAll(".left-g").data(seriesData).enter().append("path").attr("d", (0, _d3Shape.symbol)().type(shapeMapping[column.symbol] || _d3Shape.symbolCircle).size(column.size || 16)).attr("class", "left-circles ".concat(column.className, " fill-current")) // .attr("clip-path", "url(#clip)")
                  .attr("transform", function (d) {
                    return "translate(".concat(x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key]), ",").concat(yLeftFn(d[column.key] || column.unknown === "zero" && 0), ")");
                  });
                });
              };

              rightG = g.append("g").attr("class", "right-g").attr("clip-path", "url(#clip)");

              drawRightSeries = function drawRightSeries() {
                zooming && function () {
                  (0, _d3Selection.selectAll)(".right-series").remove();
                  (0, _d3Selection.selectAll)(".right-circles").remove();
                }();
                allRightY.map(function (column) {
                  var newLine = (0, _d3Shape.line)().x(function (d) {
                    return x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key]);
                  }).y(function (d) {
                    return yRightFn(d[column.key] || column.unknown === "zero" && 0);
                  }).curve(column.curve || _d3Shape.curveLinear);
                  var seriesData = data.filter(function (d) {
                    return Number.isFinite(d[column.key]) || column.unknown === "zero";
                  });
                  var seriesPath = rightG.append("path").attr("class", "right-series stroke-current ".concat(column.className || "")).datum(seriesData).attr("fill", "none").attr("clip-path", "url(#clip)").attr("d", newLine);
                  var circles = rightG.selectAll(".right-g").data(seriesData).enter().append("path").attr("clip-path", "url(#clip)").attr("d", (0, _d3Shape.symbol)().type(shapeMapping[column.symbol] || _d3Shape.symbolCircle).size(column.size || 16)).attr("class", "right-circles ".concat(column.className, " fill-current")).attr("transform", function (d) {
                    return "translate(".concat(x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key]), ",").concat(yRightFn(d[column.key] || column.unknown === "zero" && 0), ")");
                  });
                });
              };

              drawReferenceLines = function drawReferenceLines() {
                zooming && (0, _d3Selection.selectAll)(".reference-line").remove();
                referenceLines.map(function (object) {
                  // const { x, yLeft, yRight, className } = object;
                  object.x && drawVLine({
                    x: x.scalingFunction === "time" ? xFn(toDateTime(_defineProperty({}, x.key, object.x))) : xFn(object.x),
                    y: marginTop,
                    className: "".concat(object.className || "", " reference-line")
                  });
                  object.yLeft && function () {
                    drawHLine({
                      y: yLeftFn(object.yLeft),
                      x: marginLeft,
                      className: "stroke-current ".concat(object.className, " reference-line"),
                      direction: "right"
                    });
                    object.showText && g.append("text").attr("class", "stroke-current ".concat(object.className, "  reference-line-text")).attr("x", marginLeft + paddingLeft + width - 10).attr("y", yLeftFn(object.yLeft) - 5).attr("font-size", "0.7em").text("y = ".concat(object.yLeft));
                  }();
                  object.yRight && drawHLine({
                    y: yRightFn(object.yRight),
                    x: marginLeft,
                    className: "".concat(object.className || "", " reference-line"),
                    direction: "right"
                  });
                });
              };

              drawLeftSeries();
              drawRightSeries();
              drawReferenceLines();

              xValue = function xValue(d) {
                return x.scalingFunction === "time" ? xFn(toDateTime(d)) : xFn(d[x.key]);
              }; // Tooltips


              tooltipDiv = (0, _d3Selection.select)("body").append("div").attr("id", "tooltip").style("position", "absolute").style("opacity", "0").attr("class", "tooltip ".concat(tooltip && tooltip.className || ""));
              tooltip && tooltip.style && Object.entries(tooltip.style).map(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 2),
                    key = _ref3[0],
                    value = _ref3[1];

                return tooltipDiv.style(key, value);
              });

              moveTooltip = function moveTooltip(event, row) {
                var _pointer3 = (0, _d3Selection.pointer)(event, (0, _d3Selection.select)("body")),
                    _pointer4 = _slicedToArray(_pointer3, 2),
                    bX = _pointer4[0],
                    bY = _pointer4[1];

                tooltipDiv.style("left", "".concat(bX + 10, "px")).style("top", "".concat(bY + 10, "px"));
                tooltipDiv.html(tooltip.html ? tooltip.html(row) : tooltip.keys ? tooltip.keys.map(function (key) {
                  return "".concat(key, ": ").concat(row[key] || "");
                }).join("<br/>") : Object.entries(row).map(function (_ref6) {
                  var _ref7 = _slicedToArray(_ref6, 2),
                      key = _ref7[0],
                      value = _ref7[1];

                  return "".concat(key, ": ").concat(value);
                }).join("<br/>"));
              };

              tooltip && svg.on("mouseover", onMouseOverG).on("mousemove", onMouseMove).on("mouseleave", onMouseLeave); // Todo Zoom

              extent = [[marginLeft, marginTop], [width, height]];

              if (zooming) {
                zoomed = function zoomed(event) {
                  xFn.range([marginLeft + paddingLeft, width + marginLeft].map(function (d) {
                    return event.transform.applyX(d);
                  }));
                  xAxisG.call(xAxis);
                  drawLeftSeries();
                  drawRightSeries();
                  drawReferenceLines();
                };

                zoomFunc = (0, _d3Zoom.zoom)().scaleExtent([1, 4]).extent(extent).translateExtent(extent).on("zoom", zoomed);
                svg.call(zoomFunc);
              }

            case 54:
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
    refreshChart();
    return function () {
      (0, _d3Selection.selectAll)(".tooltip").remove();
    };
  }, [props]);
  return /*#__PURE__*/React.createElement("svg", {
    id: id,
    className: "".concat(className),
    width: width + marginLeft + marginRight,
    height: height + marginTop + marginBottom
  });
};

LineChart.propTypes = {
  // Data and chart choosers
  data: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  id: _propTypes["default"].string.isRequired,
  // Need this so that chart can be selected uniquely to a page
  // Data
  x: _propTypes["default"].shape({
    key: _propTypes["default"].string,
    scalingFunction: _propTypes["default"].oneOf(["linear", "time"]),
    convert: _propTypes["default"].func,
    axis: _propTypes["default"].oneOf(["bottom", "top"]),
    axisTicks: _propTypes["default"].number,
    axisLabel: _propTypes["default"].string,
    axisLabelPosition: _propTypes["default"].oneOf(["right, bottom"]),
    start: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].number]),
    end: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].number])
  }),
  y: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    key: _propTypes["default"].string.isRequired,
    axis: _propTypes["default"].oneOf(["left", "right"]),
    start: _propTypes["default"].number,
    end: _propTypes["default"].number,
    ticks: _propTypes["default"].number,
    className: _propTypes["default"].string,
    curve: _propTypes["default"].oneOf(["rounded", "step", "line"]),
    symbol: _propTypes["default"].oneOf(["circle", "square", "star", "triangle", "wye", "cross", "diamond"]),
    size: _propTypes["default"].number,
    unknown: _propTypes["default"].oneOf(["zero"])
  })),
  // Styles
  className: _propTypes["default"].string,
  // Tailwind classes to be added to the chart
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
  // Todo duration of transition
  zooming: _propTypes["default"].shape({
    min: _propTypes["default"].number,
    max: _propTypes["default"].number
  }),
  transitionDuration: _propTypes["default"].number,
  // Decorators
  tooltip: _propTypes["default"].shape({
    keys: _propTypes["default"].arrayOf(_propTypes["default"].string),
    className: _propTypes["default"].string,
    html: _propTypes["default"].func
  }),
  referenceLines: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    x: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    yLeft: _propTypes["default"].number,
    yRight: _propTypes["default"].number,
    className: _propTypes["default"].string,
    showText: _propTypes["default"].bool
  }))
};
var _default = LineChart;
exports["default"] = _default;