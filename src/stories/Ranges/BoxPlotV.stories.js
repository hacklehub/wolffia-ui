import BoxPlotV from "../../charts/BoxPlotV";

import data from "./boxPlot.json";

export default {
  title: "Ranges/Box Plots-V",
  component: BoxPlotV,
  args: {
    data,
    x: { key: "month" },
    y: {
      minKey: "min",
      maxKey: "max",
      boxStart: "firstQuartile",
      boxEnd: "lastQuartile",
      midKey: "median",
    },
  },
};

const Template = args => <BoxPlotV {...args} />;
export const Simple = Template.bind();
Simple.storyName = "Simple Box Plot";

Simple.args = {
  id: "simple-box-plot",
};

export const Tooltip = Template.bind({});
Tooltip.storyName = "Tooltip";

Tooltip.args = {
  id: "simple-box-plot",
  tooltip: {},
};
