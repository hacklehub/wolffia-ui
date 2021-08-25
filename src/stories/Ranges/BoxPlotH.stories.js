import BoxPlotH from "../../charts/BoxPlotH";

import data from "./boxPlot.json";

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
    minKey: "min",
    maxKey: "max",
    boxStart: "firstQuartile",
    boxEnd: "lastQuartile",
    midKey: "median",
  },
};

export const Styled = Template.bind();
Styled.storyName = "Styled Box Plot";

Styled.args = {
  id: "simple-box-plot",
  y: { key: "month" },
  x: {
    minKey: "min",
    midKey: "median",
    maxKey: "max",
    boxStart: "firstQuartile",
    boxEnd: "lastQuartile",
  },
  marginLeft: 80,
  classNameBoxes: "fill-current text-yellow-50 opacity-50",
};
