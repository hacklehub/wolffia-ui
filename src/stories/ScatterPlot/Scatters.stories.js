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
    x: { key: "independant" },
    y: {
      key: "dependant",
    },
  },
};

const Template = args => <ScatterPlot {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Simple Scatterplot";

Simple.args = {
  id: "simple-scatter",
};

export const Styled = Template.bind();
Styled.storyName = "Styled Scatterplot";

Styled.args = {
  id: "styled-scatter",
  className: "bg-red-100 dark:bg-red-900",
};

export const Colored = Template.bind();
Colored.storyName = "Class Name to points by categorical value";

Colored.args = {
  id: "colored-scatter",
  classNamePoints: { key: "category", className: "opacity-50", classMap },
};

export const Bubble = Template.bind();
Bubble.storyName = "Bubble chart";

Bubble.args = {
  id: "bubble-scatter",
  data: data.filter((_, i) => i <= 20),
  classNamePoints: { key: "category", className: "opacity-50", classMap },
  size: {
    key: "sizeVariable",
    min: 100,
    max: 400,
  },
};

export const Tooltip = Template.bind();
Tooltip.storyName = "With Tooltip";

Tooltip.args = {
  id: "simple-tooltip",
  tooltip: {},
};

export const CustomKeysTooltip = Template.bind();
CustomKeysTooltip.storyName = "Custom Keys Tooltip";
CustomKeysTooltip.args = {
  id: "custom-keys-tooltip",
  tooltip: {
    keys: ["sizeVariable", "independant"],
  },
};

export const CustomHTMLTooltip = Template.bind();
CustomHTMLTooltip.storyName = "Custom HTML Tooltip";

CustomHTMLTooltip.args = {
  id: "custom-tooltip",
  tooltip: {
    html: row =>
      `y = ${row.dependant} <br/> x = ${row.independant} <br/> size = ${row.sizeVariable} <br/> ${row.category}`,
  },
};

export const Drawing = Template.bind();
Drawing.storyName = "With entry animation - delay";

Drawing.args = {
  id: "drawing-scatter",
  drawing: {
    delay: 10,
    duration: 2000,
  },
};

export const Connect = Template.bind();
Connect.storyName = "Connected scatterplot";

Connect.args = {
  id: "connect-scatter",
  data: data.filter((_, i) => i < 10),
  drawing: {
    delay: 100,
  },
  connect: {
    className: "text-purple-300",
  },
};
