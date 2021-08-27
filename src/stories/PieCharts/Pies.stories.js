import PieChart from "../../charts/PieChart";

const data = [
  { name: "Product A", USA: 10000, Europe: 4000, APAC: 5000, Africa: 1000 },
  { name: "Product B", USA: 9400, Europe: 9000, APAC: 4000 },
  { name: "Product C", USA: 6000, Europe: 4000, APAC: 1000 },
];

const classMap = {
  "Product A": "text-purple-700",
  "Product B": "text-purple-500",
  "Product C": "text-purple-300",
};

export default {
  title: "Pie Charts/Pie",
  component: PieChart,
  parameters: {
    controls: { sort: "requiredFirst" },
  },
  args: {
    data,
  },
};

const Template = args => <PieChart {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Simple pie chart";

Simple.args = {
  id: "simple-pie-chart",
  classNamePoints: { classMap },
  labels: { key: "name" },
  value: "USA",
};

export const Donut = Template.bind();
Donut.storyName = "Simple Donut";

Donut.args = {
  id: "simple-donut-chart",
  classNamePoints: { classMap },
  labels: { key: "name" },
  value: "USA",
  innerRadius: 0.7,
};

export const Drawing = Template.bind();
Drawing.storyName = "Donut with entry animation";

Drawing.args = {
  id: "simple-donut-chart-animated",
  classNamePoints: { classMap },
  labels: { key: "name" },
  value: "USA",
  innerRadius: 0.7,
  drawing: { duration: 1000 },
};

export const Tooltip = Template.bind();
Tooltip.storyName = "Tooltip";

Tooltip.args = {
  id: "simple-tooltip",
  classNamePoints: { classMap },
  labels: { key: "name" },
  value: "USA",
  tooltip: {},
};

export const Labels = Template.bind();
Labels.storyName = "Labels around the chart";

Labels.args = {
  id: "labels-around-chart",
  className: "md:w-6/12",
  classNamePoints: { classMap },
  innerRadius: 0.7,
  labels: { key: "name", radius: 0.9, className: "text-xs" },
  value: "USA",
};

export const PaddingAngle = Template.bind();
PaddingAngle.storyName = "Padding Angle ";

PaddingAngle.args = {
  id: "padding-angle",
  className: "md:w-6/12",
  classNamePoints: { classMap },
  innerRadius: 0.7,
  paddingAngle: 0.04,
  value: "USA",
};

export const CornerRadius = Template.bind();
CornerRadius.storyName = "Add corner radius ";

CornerRadius.args = {
  id: "padding-angle",
  className: "md:w-6/12",
  classNamePoints: { classMap },
  innerRadius: 0.7,
  cornerRadius: 5,
  paddingAngle: 0.04,
  value: "USA",
};
