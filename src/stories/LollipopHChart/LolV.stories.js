import LollipopVChart from "../../charts/LollipopVChart";

const data = [
  { reading: 110, name: "Category 1" },
  { reading: 100, name: "Category 2" },
  { reading: 80, name: "Category 3" },
  { reading: 90, name: "Category 4" },
];

export default {
  title: "Ordered/Lollipop Vertical",
  component: LollipopVChart,
  args: {
    data,
  },
};

const Template = args => <LollipopVChart {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Simple Lollipop Vertical Chart";

Simple.args = {
  id: "simple-lollipop-v",
  y: {
    key: "reading",
  },
  x: {
    key: "name",
  },
};
