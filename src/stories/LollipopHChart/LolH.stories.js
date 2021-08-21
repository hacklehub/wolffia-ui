import LollipopHChart from "../../charts/LollipopHChart";

const data = [
  { reading: 110, name: "Category 1" },
  { reading: 100, name: "Category 2" },
  { reading: 80, name: "Category 3" },
  { reading: 90, name: "Category 4" },
];

export default {
  title: "Ordered/Lollipop Horizontal",
  component: LollipopHChart,
  args: {
    data,
  },
};

const Template = args => <LollipopHChart {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Simple Lollipop Horizontal Chart";

Simple.args = {
  id: "simple-lollipop-h",
  x: {
    key: "reading",
    axisTicks: 2,
    start: 0,
  },
  y: {
    key: "name",
  },
};
