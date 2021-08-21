import PieChart from "../../charts/PieChart";

const data = [
  { name: "Product A", USA: 10000, Europe: 4000, APAC: 5000, Africa: 1000 },
  { name: "Product B", USA: 9400, Europe: 9000, APAC: 4000 },
  { name: "Product C", USA: 8000, Europe: 4000, APAC: 1000 },
];

const classMap = {
  "Product A": "text-purple-700",
  "Product B": "text-purple-500",
  "Product C": "text-purple-300",
};

export default {
  title: "Pie Charts/Pie",
  component: PieChart,
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
  label: "name",
  value: "USA",
};

export const Donut = Template.bind();
Donut.storyName = "Simple Donut";

Donut.args = {
  id: "simple-donut-chart",
  classNamePoints: { classMap },
  label: "name",
  value: "USA",
  innerRadius: 0.7,
};

export const Drawing = Template.bind();
Drawing.storyName = "Donut with entry animation";

Drawing.args = {
  id: "simple-donut-chart-animated",
  classNamePoints: { classMap },
  label: "name",
  value: "USA",
  innerRadius: 0.7,
  drawing: { duration: 1000 },
};
