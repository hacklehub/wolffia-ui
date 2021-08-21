const data = [
  { name: "Product A", USA: 10000, Europe: 4000, APAC: 5000, Africa: 1000 },
  { name: "Product B", USA: 9400, Europe: 9000, APAC: 4000 },
  { name: "Product C", USA: 8000, Europe: 4000, APAC: 1000 },
];

import BarChartGrouped from "../../charts/BarChartGrouped";

export default {
  title: "Bar Chart/Grouped",
  component: BarChartGrouped,
  parameters: { controls: { sort: "requiredFirst" } },
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
    y: { key: "name" },
    x: [
      {
        key: "USA",
        className: "text-purple-300",
      },
      { key: "Europe", className: "text-purple-500 " },
    ],
  },
};

//👇 We create a “template” of how args map to rendering
const Template = args => <BarChartGrouped {...args} />;

export const Simple = Template.bind({});
Simple.storyName = "Simple Grouped Bar chart";

Simple.args = {
  id: "simple-bar-chart",
  x: [
    {
      key: "USA",
      className: "text-purple-300",
    },
    { key: "Europe", className: "text-purple-500 " },
  ],
  y: { key: "name" },
};

export const StyleChart = Template.bind();
StyleChart.storyName = "Style the chart overall with Tailwindcss className's ";

StyleChart.args = {
  id: "styled-bar-grouped-chart",
  className: "border rounded bg-green-900",
};

export const Left = Template.bind({});
Left.storyName = "Reversing direction";

Left.args = {
  direction: "left",
  id: "simple-left-bar-chart",
};

export const Drawing = Template.bind({});
Drawing.storyName = "With entry animation";

Drawing.args = {
  drawing: { duration: 1000 },
  id: "simple-drawing-bar-chart",
};
