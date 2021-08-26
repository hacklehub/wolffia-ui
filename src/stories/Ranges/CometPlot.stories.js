import CometPlot from "../../charts/CometPlot";

const data = [
  {
    month: "Jan",
    minimum: 15,
    maximum: 20,
    avg: 18,
    firstQuartile: 16,
    lastQuartile: 19,
  },
  {
    month: "Feb",
    minimum: 18,
    maximum: 28,
    avg: 23,
    firstQuartile: 21,
    lastQuartile: 25,
  },
  {
    month: "Mar",
    minimum: 25,
    maximum: 34,
    avg: 30,
    firstQuartile: 27,
    lastQuartile: 33,
  },
  {
    month: "Apr",
    minimum: 27,
    maximum: 35,
    avg: 30,
    firstQuartile: 28,
    lastQuartile: 32,
  },
  {
    month: "May",
    minimum: 29,
    maximum: 38,
    avg: 36,
    firstQuartile: 33,
    lastQuartile: 37,
  },
  {
    month: "Jun",
    minimum: 27,
    maximum: 35,
    avg: 32,
  },
];

export default {
  title: "Ranges/Comet Plots",
  component: CometPlot,
  args: {
    data,
  },
};

const Template = args => <CometPlot {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Comet Plot";

Simple.args = {
  id: "climate-month-wise-shape",
  className: "text-green-700 dark:text-green-300",
  y: { key: "month" },
  x: { minKey: "minimum", maxKey: "maximum" },
};

export const CustomStart = Template.bind();
CustomStart.storyName = "Custom Axis";

CustomStart.args = {
  id: "climate-month-wise-shape",
  className: "text-green-700 dark:text-green-300",
  y: { key: "month" },
  x: { minKey: "minimum", maxKey: "maximum", start: 0 },
};

export const CustomShape = Template.bind();
CustomShape.storyName = "Custom Shapes and className";

CustomShape.args = {
  id: "climate-month-wise-shape",
  className: "text-green-700 dark:text-green-300",
  y: { key: "month" },
  x: {
    minKey: "minimum",
    maxKey: "maximum",
    start: 0,
    className: "text-red-300",
  },
  shape: "diamond",
};

export const CustomSize = Template.bind();
CustomSize.storyName = "Custom size";

CustomSize.args = {
  id: "climate-month-wise-shape",
  className: "text-green-700 dark:text-green-300",
  y: { key: "month" },
  x: {
    minKey: "minimum",
    maxKey: "maximum",
    start: 0,
    className: "text-red-300",
  },
  size: 25,
};

export const Zooming = Template.bind();
Zooming.storyName = "Zooming custom start";

Zooming.args = {
  id: "climate-month-wise",
  className: "text-green-700 dark:text-green-300",
  y: { key: "month" },
  x: { minKey: "minimum", maxKey: "maximum", start: 0, end: 50 },
  zooming: {},
};
