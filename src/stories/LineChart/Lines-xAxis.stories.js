import LineChart from "../../charts/LineChart/index";
import "./styles.css";

const data = [
  { id: 1, value: 1311, reading: 1500 },
  { id: 2, reading: 1912 },
  { id: 3, value: 1000 },
  { id: 4, value: 1513 },
  { id: 5, value: 1351, reading: 1000 },
  { id: 6, value: 1451, reading: 1200 },
];

export default {
  title: "Serial data/LineCharts/Customize X-Axis",
  component: LineChart,
  args: {
    data,
  },
};

const Template = args => <LineChart {...args} />;

export const XAxisLabel = Template.bind();
XAxisLabel.storyName = "Add label to x axis";

XAxisLabel.args = {
  id: "x-axis-label-line-chart",
  x: { key: "id", axisLabel: "Some index" },
  y: [
    { key: "value", className: "text-green-500" },
    {
      key: "reading",
      className: "text-blue-500 ",
      axis: "right",
    },
  ],
  className: "",
};

export const CustomStart = Template.bind();
CustomStart.storyName = "Start & end at a custom point instead of min & max";

CustomStart.args = {
  id: "x-axis-custom-start-line-chart",
  x: { key: "id", axisLabel: "Some index", start: 0, end: 7 },
  y: [
    { key: "value", className: "text-green-500" },
    {
      key: "reading",
      className: "text-blue-500 ",
    },
  ],
  className: "",
};

export const AxisTop = Template.bind();
AxisTop.storyName = "X axis at the top";

AxisTop.args = {
  id: "x-axis-top",
  x: { key: "id", axisLabel: "Some index", axis: "top" },
  y: [
    { key: "value", className: "text-green-500" },
    {
      key: "reading",
      axis: "right",
      className: "text-blue-500 ",
    },
  ],
  className: "",
};

export const AxisTicks = Template.bind();
AxisTicks.storyName = "Custom Axis ticks";

AxisTicks.args = {
  id: "custom-axis-ticks",
  x: { key: "id", axisLabel: "Some index", axisTicks: 15 },
  y: [
    { key: "value", className: "text-green-500" },
    {
      key: "reading",

      className: "text-blue-500 ",
    },
  ],
  className: "",
};
