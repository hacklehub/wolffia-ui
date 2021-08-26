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
  title: "Serial data/LineCharts/Tooltip",
  component: LineChart,
  args: {
    data,
  },
};

const Template = args => <LineChart {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Simple Line Chart";

Simple.args = {
  id: "simple-line-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500" },
    { key: "reading", className: "text-blue-500" },
  ],
  tooltip: { keys: ["id", "value", "reading"] },
};

export const Guidelines = Template.bind();
Guidelines.storyName = "Show anchor lines on hover on a Line Chart";

Guidelines.args = {
  id: "Guidelines-line-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500" },
    { key: "reading", className: "text-blue-500" },
  ],
  tooltip: { keys: ["id", "value", "reading"] },
  showGuidelines: true,
};

export const Styled = Template.bind();
Styled.storyName = "Style tooltip with tailwind";

Styled.args = {
  id: "styled-tooltip-line-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500" },
    { key: "reading", className: "text-blue-500" },
  ],
  tooltip: { keys: ["id", "value", "reading"], className: "text-green-500" },
  showGuidelines: true,
};

export const CustomHTML = Template.bind();
CustomHTML.storyName = "Custom html";

CustomHTML.args = {
  id: "html-tooltip-line-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500" },
    { key: "reading", className: "text-blue-500" },
  ],
  tooltip: {
    keys: ["id", "value", "reading"],
    className: "text-green-500",
    html: row => `${row.id} - ${row.value || ""}/${row.reading || ""}`,
  },
  showGuidelines: true,
};
