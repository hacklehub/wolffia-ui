const data = [
  { name: "Product A", USA: 10000, Europe: 4000, APAC: 5000, Africa: 1000 },
  { name: "Product B", USA: 9400, Europe: 9000, APAC: 4000 },
  { name: "Product C", USA: 8000, Europe: 4000, APAC: 1000 },
];

import BarChartStacked from "../../charts/BarChartStacked";

export default {
  title: "Bar Charts/Stacked",
  component: BarChartStacked,
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
  },
};

const Template = args => <BarChartStacked {...args} />;

export const Simple = Template.bind({});
Simple.storyName = "Simple Stacked Bar chart";
Simple.parameters = {
  docs: {
    description: {
      story: "Some story **markdown**",
    },
  },
};
Simple.args = {
  id: "simple-bar-chart",
  x: [
    {
      key: "USA",
      className: "text-purple-300",
    },
    { key: "Europe", className: "text-purple-500 " },
    { key: "APAC", className: "text-purple-700" },
    { key: "Africa", className: "text-purple-900" },
  ],
  y: { key: "name" },
};

export const Styled = Template.bind();
Styled.storyName = "Styled";

Styled.args = {
  id: "styled-bar-chart",
  x: [
    {
      key: "USA",
      className: "text-purple-300",
    },
    { key: "Europe", className: "text-purple-500 " },
    { key: "APAC", className: "text-purple-700" },
    { key: "Africa", className: "text-purple-900" },
  ],
  y: { key: "name" },
  className: "bg-gray-900 text-white rounded border h-48 lg:w-6/12",
};

export const Tooltip = Template.bind();
Tooltip.storyName = "Tooltip";

Tooltip.args = {
  id: "stacked-bar-tooltip",
  x: [
    {
      key: "USA",
      className: "text-purple-300",
    },
    { key: "Europe", className: "text-purple-500 " },
    { key: "APAC", className: "text-purple-700" },
    { key: "Africa", className: "text-purple-900" },
  ],
  y: { key: "name" },
  tooltip: {},
};

export const Drawing = Template.bind({});
Drawing.storyName = "Entry animation";

Drawing.args = {
  id: "simple-bar-chart-drawing",
  x: [
    {
      key: "USA",
      className: "text-purple-300",
    },
    { key: "Europe", className: "text-purple-500 " },
    { key: "APAC", className: "text-purple-700" },
    { key: "Africa", className: "text-purple-900" },
  ],
  y: { key: "name" },
  drawing: { duration: 1000 },
};

export const Waterfall = Template.bind();
Waterfall.storyName = "Waterfall";

Waterfall.args = {
  id: "simple-bar-chart-drawing",
  x: [
    {
      key: "USA",
      className: "text-purple-300",
    },
    { key: "Europe", className: "text-purple-500 " },
    { key: "APAC", className: "text-purple-700" },
    { key: "Africa", className: "text-purple-900" },
  ],
  y: { key: "name" },
  waterfall: { padding: 5 },
};

const newData = data.map(row => {
  const total =
    (+row.USA || 0) +
    (+row.Europe || 0) +
    (+row.Africa || 0) +
    (+row.APAC || 0);
  return {
    name: row.name,
    USA: (row.USA || 0) / total,
    Europe: (row.Europe || 0) / total,
    Africa: (row.Africa || 0) / total,
    APAC: (row.APAC || 0) / total,
  };
});

export const Proportion = Template.bind();
Proportion.storyName = "100% Stacked bar";

Proportion.args = {
  data: newData,
  id: "full-stacked-bar",
  x: [
    {
      key: "USA",
      className: "text-purple-300",
    },
    { key: "Europe", className: "text-purple-500 " },
    { key: "APAC", className: "text-purple-700" },
    { key: "Africa", className: "text-purple-900" },
  ],
  y: { key: "name" },
  tooltip: {},
  tickFormat: "%",
};

export const Labels = Template.bind();
Labels.storyName = "Add Labels";

Labels.args = {
  id: "simple-bar-chart-labels",
  x: [
    {
      key: "USA",
      className: "text-purple-300",
    },
    { key: "Europe", className: "text-purple-500 " },
    { key: "APAC", className: "text-purple-700" },
    { key: "Africa", className: "text-purple-900" },
  ],
  y: { key: "name" },
  drawing: { duration: 1000 },
  dataLabels: {},
};

/*export const Direction = Template.bind();
Direction.storyName = "Left ";

Direction.args = {
  id: "simple-bar-chart-left",
  x: [
    {
      key: "USA",
      className: "text-purple-300",
    },
    { key: "Europe", className: "text-purple-500 " },
    { key: "APAC", className: "text-purple-700" },
    { key: "Africa", className: "text-purple-900" },
  ],
  y: { key: "name" },
  direction: "lelft",
};
*/
