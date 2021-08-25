const data = [
  { name: "Product A", USA: 10000, Europe: 4000, APAC: 5000, Africa: 1000 },
  { name: "Product B", USA: 9400, Europe: 9000, APAC: 4000 },
  { name: "Product C", USA: 8000, Europe: 4000, APAC: 1000 },
];

import ColumnChartGrouped from "../../charts/ColumnChartGrouped";

export default {
  title: "Bar Charts/Vertical/Grouped",
  component: ColumnChartGrouped,
  parameters: {
    controls: { sort: "requiredFirst" },
    docs: {
      description: "A simple stacked-bar chart",
    },
  },
  argTypes: {
    direction: {
      options: ["left", "right"],
      control: { type: "radio" },
    },
    drawing: {
      control: { type: "object" },
    },
  },
  args: {
    data,
    y: [
      {
        key: "USA",
        start: 0,
        className: "text-purple-300",
      },
      { key: "Europe", className: "text-purple-500 " },
      { key: "APAC", className: "text-purple-700" },
      { key: "Africa", className: "text-purple-900" },
    ],
    x: { key: "name" },
  },
};

const Template = args => <ColumnChartGrouped {...args} />;

export const Simple = Template.bind({});
Simple.storyName = "Simple Stacked Column chart";
Simple.parameters = {
  docs: {
    description: {
      story: "Some story **markdown**",
    },
  },
};
Simple.args = {
  id: "simple-bar-chart",
};

export const Styled = Template.bind({});
Styled.storyName = "Styled chart";

Styled.args = {
  id: "styled-bar-chart",
  className: "text-red-900",
};

export const Tooltip = Template.bind();
Tooltip.storyName = "tooltip";

Tooltip.args = {
  id: "tooltip-column-chart",
  tooltip: {},
};

export const Drawing = Template.bind({});
Drawing.storyName = "With entry animation";

Drawing.args = {
  id: "with-drawing",
  drawing: {
    duration: 1000,
  },
};
