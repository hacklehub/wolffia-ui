import LineChart from "../../charts/LineChart/index";
import "../styles.css";

const data = [
  { id: 1, value: 1311, reading: 1500 },
  { id: 2, reading: 1912 },
  { id: 3, value: 1000 },
  { id: 4, value: 1513 },
  { id: 5, value: 1351, reading: 1000 },
  { id: 6, value: 1451, reading: 1200 },
];

export default {
  title: "Serial data/LineCharts/Customize Y axis",
  component: LineChart,
  args: {
    data,
  },
};

const Template = args => <LineChart {...args} />;

export const CustomStart = Template.bind();
CustomStart.storyName = "Custom start axis";
CustomStart.args = {
  id: "y-axis-custom-start-chart",
  x: { key: "id", axisLabel: "Some index" },
  y: [
    { key: "value", className: "text-green-500", start: 0 },
    {
      key: "reading",
      className: "text-blue-500 ",
      axis: "right",
      start: 0,
      ticks: 3,
    },
  ],
  className: "",
};

export const Symbol = Template.bind();
Symbol.storyName = "Connect the points";

Symbol.args = {
  id: "y-axis-custom-symbol-chart",
  x: { key: "id", axisLabel: "Some index" },
  y: [
    { key: "value", className: "text-green-500", start: 0, symbol: "diamond" },
    {
      key: "reading",
      symbol: "circle",
      className: "text-blue-500 ",
      axis: "right",
      start: 0,
      ticks: 3,
    },
  ],
  className: "",
};

export const Unknown = Template.bind();
Unknown.storyName = "Handle unknown values";

Unknown.args = {
  id: "y-axis-unknown-chart",
  x: { key: "id", axisLabel: "Some index" },
  y: [
    {
      key: "value",
      className: "text-green-500",
      start: 0,
      symbol: "diamond",
      unknown: "zero",
    },
    {
      key: "reading",
      symbol: "circle",
      className: "text-blue-500 ",
      axis: "right",
      unknown: "zero",
      start: 0,
      ticks: 3,
    },
  ],
  className: "",
};

export const Label = Template.bind();
Label.storyName = "Customize axis label";

Label.args = {
  id: "y-axis-custom-label-chart",
  x: { key: "id", axisLabel: "Some index" },
  y: [
    {
      key: "value",
      className: "text-green-500",
      start: 0,
      symbol: "diamond",
      axisLabel: "Volume",
    },
    {
      key: "reading",
      symbol: "circle",
      axisLabel: "Pressure",
      className: "text-blue-500 ",
      axis: "right",
      start: 0,
      ticks: 3,
    },
  ],
  className: "",
};

export const Curve = Template.bind();
Curve.storyName = "Customize the curve";

Curve.args = {
  id: "y-axis-custom-curve-chart",
  x: { key: "id", axisLabel: "Some index" },
  y: [
    {
      key: "value",
      className: "text-green-500",
      start: 0,
      symbol: "diamond",
      curve: "step",
    },
    {
      key: "reading",
      symbol: "circle",
      className: "text-blue-500 ",
      axis: "right",
      start: 0,
      ticks: 3,
    },
  ],
  className: "",
};
