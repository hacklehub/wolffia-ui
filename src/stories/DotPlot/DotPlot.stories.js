import DotPlot from "../../charts/DotPlot";

const data = [
  { month: "Jan", minimum: 15, maximum: 20 },
  { month: "Feb", minimum: 18, maximum: 28 },
  { month: "Mar", minimum: 25, maximum: 34 },
  { month: "Apr", minimum: 27, maximum: 35 },
  { month: "May", minimum: 29, maximum: 38 },
  { month: "Jun", minimum: 27, maximum: 35 },
];

export default {
  title: "Ranges/Dot Plots",
  component: DotPlot,
  args: {
    data,
  },
};

const Template = args => <DotPlot {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Dot Plot";

Simple.args = {
  id: "climate-month-wise-shape",
  className: "text-green-700 dark:text-green-300",
  y: { key: "month" },
  x: { minKey: "minimum", maxKey: "maximum", minValue: 0, maxValue: 45 },
};

export const Shape = Template.bind();
Shape.storyName = "Custom Shapes";

Shape.args = {
  id: "climate-month-wise",
  className: "text-green-700 dark:text-green-300",
  y: { key: "month" },
  x: { minKey: "minimum", maxKey: "maximum", minValue: 0, maxValue: 50 },
  shape: "square",
};
