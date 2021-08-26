import DotPlot from "../../charts/DotPlot";

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
  title: "Ranges/Dot Plots",
  component: DotPlot,
  args: {
    data,
  },
};

const Template = args => <DotPlot {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Dot Plot";

Simple.args = {
  id: "climate-month-wise-shape",
  className: "text-green-700 dark:text-green-300",
  y: { key: "month" },
  x: { minKey: "minimum", maxKey: "maximum" },
};

export const Shape = Template.bind();
Shape.storyName = "Custom Shapes";

Shape.args = {
  id: "climate-month-wise",
  className: "text-green-700 dark:text-green-300",
  y: { key: "month" },
  x: { minKey: "minimum", maxKey: "maximum" },
  shape: "square",
};

export const Axis = Template.bind();
Axis.storyName = "Axis custom start";

Axis.args = {
  id: "climate-month-wise",
  className: "text-green-700 dark:text-green-300",
  y: { key: "month" },
  x: { minKey: "minimum", maxKey: "maximum", start: 0, end: 50 },
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
