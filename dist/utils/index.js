"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawHorizontal = exports.isNDef = void 0;

var isNDef = function isNDef(value) {
  return value === undefined || value === null;
};

exports.isNDef = isNDef;

var drawHorizontal = function drawHorizontal(g, x1, x2, y) {
  g.append("line").attr("");
};

exports.drawHorizontal = drawHorizontal;