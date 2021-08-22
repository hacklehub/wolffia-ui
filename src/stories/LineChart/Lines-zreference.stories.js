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
  title: "Serial data/LineCharts/Reference lines",
  component: LineChart,
  args: {
    data,
  },
};

const Template = args => <LineChart {...args} />;

export const Vertical = Template.bind();
Vertical.storyName = "Line Chart - with Vertical reference line";

Vertical.args = {
  id: "horizontal-line-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500" },
    { key: "reading", className: "text-blue-500" },
  ],
  tooltip: { keys: ["id", "value", "reading"] },
  referenceLines: [
    { x: 4, className: "stroke-current text-blue-200 stroke-2 dashed" },
  ],
};

export const Horizontal = Template.bind();
Horizontal.storyName = "Line Chart - with Horizontal reference line";

Horizontal.args = {
  id: "vertical-line-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500" },
    { key: "reading", className: "text-blue-500" },
  ],
  tooltip: { keys: ["id", "value", "reading"] },
  referenceLines: [
    { yLeft: 1600, className: "stroke-current text-blue-200 stroke-1 dashed" },
  ],
};
