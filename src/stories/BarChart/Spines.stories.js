import SpineChart from "../../charts/SpineChart";

const data = [
  {
    ageBucket: "18-25",
    maleYes: 6000,
    maleNo: 5000,
    femaleYes: 6000,
    femaleNo: 4000,
  },
  {
    ageBucket: "26-35",
    maleYes: 4000,
    maleNo: 6000,
    femaleYes: 4000,
    femaleNo: 4000,
  },
  {
    ageBucket: "35-50",
    maleYes: 3500,
    maleNo: 2400,
    femaleYes: 3000,
    femaleNo: 2500,
  },
];

export default {
  title: "Bar Charts/Horizontal/Spine Charts",
  component: SpineChart,
  args: {
    data,
  },
};

const Template = args => <SpineChart {...args} />;

export const Simple = Template.bind({});
Simple.storyName = "Simple Spine chart";

Simple.args = {
  id: "simple-spine-chart",
  x: [
    { key: "maleYes", direction: "left", className: "text-purple-200" },
    { key: "maleNo", direction: "left", className: "text-purple-500" },
    { key: "femaleNo", className: "text-pink-200" }, // Direction right
    { key: "femaleYes", className: "text-pink-500" },
  ],
  y: { key: "ageBucket" },
};
