import ScatterPlot from "../../charts/ScatterPlot";

const randBetween = (x, y) => Math.floor(x + Math.random() * (y - x));

const categories = ["Category A", "Category B"];

const classMap = {
  "Category A": "text-blue-500 hover:text-blue-200 ",
  "Category B": "text-red-500 hover:text-red-200",
};

const data = new Array(100).fill("").map(v => ({
  dependant: randBetween(1000, 1500),
  independant: randBetween(300, 500),
  sizeVariable: randBetween(100, 400),
  category: categories[randBetween(0, 2)],
}));

const shapeMap = { "Category A": "diamond", "Category B": "diamond" };

export default {
  title: "Scatter plots/Scatter",
  component: ScatterPlot,
  args: {
    data,
  },
};

const Template = args => <ScatterPlot {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Simple Scatterplot";

Simple.args = {
  id: "simple-scatter",
  x: { key: "independant", axisTicks: 10 },
  y: {
    key: "dependant",
    axisTicks: 10,
  },
};
