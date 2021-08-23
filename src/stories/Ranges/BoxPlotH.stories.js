import BoxPlotH from "../../charts/BoxPlotH";

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
  title: "Ranges/Box Plots-H",
  component: BoxPlotH,
  args: {
    data,
  },
};

const Template = args => <BoxPlotH {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Simple Box Plot";

Simple.args = {
  id: "simple-box-plot",
  y: { key: "month" },
  x: {
    minKey: "minimum",
    maxKey: "maximum",
    boxStart: "firstQuartile",
    boxEnd: "lastQuartile",
    midKey: "avg",
  },
};

export const Styled = Template.bind();
Styled.storyName = "Styled Box Plot";

Styled.args = {
  id: "simple-box-plot",
  y: { key: "month" },
  x: {
    minKey: "minimum",
    midKey: "avg",
    maxKey: "maximum",
    boxStart: "firstQuartile",
    boxEnd: "lastQuartile",
  },
  classNameBoxes: "fill-current text-yellow-50 opacity-50",
};
