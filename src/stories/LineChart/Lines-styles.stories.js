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
  title: "Serial data/LineCharts/Getting Started",
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
  y: [{ key: "value" }, { key: "reading" }],
};

export const Styles = Template.bind();
Styles.storyName = "Style series";

Styles.args = {
  id: "styled-line-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500 stroke-2 hover:text-green-900" },
    { key: "reading", className: "text-blue-500" },
  ],
};

export const CustomStyles = Template.bind();
CustomStyles.storyName = "Custom Styling";

CustomStyles.args = {
  id: "custom-styled-line-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500" },
    { key: "reading", className: "text-blue-500 running stroke-2" },
  ],
};

export const StyleChart = Template.bind();
StyleChart.storyName = "Style entire chart";

StyleChart.args = {
  id: "style-entire-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500" },
    { key: "reading", className: "text-blue-500 " },
  ],
  className: "",
};

export const PaddedChart = Template.bind();
PaddedChart.storyName = "Padded Chart";

PaddedChart.args = {
  id: "padded-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500" },
    { key: "reading", className: "text-blue-500 " },
  ],
  className: "",
  paddingLeft: 15,
};

export const TwoAxes = Template.bind();
TwoAxes.storyName = "Left and right axis";

TwoAxes.args = {
  id: "style-entire-chart",
  x: { key: "id" },
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

export const Drawing = Template.bind();
Drawing.storyName = "Drawing - entry animation";

Drawing.args = {
  id: "drawing-line-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500" },
    {
      key: "reading",
      className: "text-blue-500 ",
      axis: "right",
    },
  ],
  className: "",
  drawing: { duration: 1000 },
};

export const Zooming = Template.bind();
Zooming.storyName = "Zooming - entry animation";

Zooming.args = {
  id: "drawing-line-chart",
  x: { key: "id" },
  y: [
    { key: "value", className: "text-green-500" },
    {
      key: "reading",
      className: "text-blue-500 ",
      axis: "right",
    },
  ],
  className: "",
  zooming: true,
};
