const data = [
  {
    Month: "Jun 2021",
    "Rice Product": 218,
    "Rice Powders": 246.28,
    Masala: 158,
    Pickle: 636.88,
    Payasam: 26,
    Beverages: 712.56,
    Paste: 15,
  },
  {
    Month: "May 2021",
    "Rice Product": 503,
    "Rice Powders": 114.83,
    Masala: 421,
    Pickle: 697.06,
    Payasam: 54,
    Beverages: 413.63,
    Paste: 35,
  },
  {
    Month: "Apr 2021",
    "Rice Product": 474,
    "Rice Powders": 194.67,
    Masala: 374,
    Pickle: 269.04,
    Payasam: 45,
    Beverages: 232.9,
    Paste: 28,
  },
  {
    Month: "Mar 2021",
    "Rice Product": 578,
    "Rice Powders": 944.24,
    Masala: 447,
    Pickle: 628.81,
    Payasam: 78,
    Beverages: 477.63,
    Paste: 72,
  },
  {
    Month: "Feb 2021",
    "Rice Product": 435,
    "Rice Powders": 837.88,
    Masala: 324,
    Pickle: 199.69,
    Payasam: 74,
    Beverages: 862.74,
    Paste: 62,
  },
  {
    Month: "Jan 2021",
    "Rice Product": 411,
    "Rice Powders": 126.15,
    Masala: 311,
    Pickle: 481.66,
    Payasam: 54,
    Beverages: 562.87,
    Paste: 67,
  },
];

import BarChartStacked from "../../charts/BarChartStacked";

export default {
  title: "Bar Charts/Horizontal/Stacked",
  component: BarChartStacked,
  parameters: {
    controls: { sort: "requiredFirst" },
    docs: {
      description: "A simple stacked-bar chart",
    },
  },
  argTypes: {
    direction: {
      options: ["left", "right"],
      control: { type: "radio" },
    },
    drawing: {
      control: { type: "object" },
    },
  },
  args: {
    data,
    x: [
      { key: "Rice Product", className: "text-purple-100" },
      { key: "Rice Powders", className: "text-purple-300" },
      { key: "Masala", className: "text-purple-400" },
      { key: "Pickle", className: "text-purple-500" },
      { key: "Payasam", className: "text-purple-600" },
      { key: "Beverages", className: "text-purple-700" },
      { key: "Paste", className: "text-purple-900" },
    ],
    y: { key: "Month" },
  },
};

const Template = args => <BarChartStacked {...args} />;

export const Simple = Template.bind({});
Simple.storyName = "Simple Stacked Bar chart";
Simple.parameters = {
  docs: {
    description: {
      story: "Some story **markdown**",
    },
  },
};
Simple.args = {
  id: "simple-bar-chart",
};

export const Styled = Template.bind();
Styled.storyName = "Styled";

Styled.args = {
  id: "styled-bar-chart",
  className: "bg-gray-900 text-white rounded border h-48 lg:w-6/12",
};

export const Tooltip = Template.bind();
Tooltip.storyName = "Tooltip";

Tooltip.args = {
  id: "stacked-bar-tooltip",
  tooltip: {},
};

export const Drawing = Template.bind({});
Drawing.storyName = "Entry animation";

Drawing.args = {
  id: "simple-bar-chart-drawing",
  drawing: { duration: 1000 },
};

export const Waterfall = Template.bind();
Waterfall.storyName = "Waterfall";

Waterfall.args = {
  id: "simple-bar-chart-drawing",
  waterfall: { padding: 1 },
};

const newData = data.map(row => {
  const total =
    (+row["Rice Powders"] || 0) +
    (+row["Rice Product"] || 0) +
    (+row.Masala || 0) +
    (+row.Pickle || 0) +
    (+row.Payasam || 0) +
    (+row.Paste || 0) +
    (+row.Beverages || 0);
  return {
    Month: row.Month,
    "Rice Powders": (row["Rice Powders"] || 0) / total,
    "Rice Product": (row["Rice Product"] || 0) / total,
    Masala: (row.Masala || 0) / total,
    Pickle: (row.Pickle || 0) / total,
    Payasam: (row.Payasam || 0) / total,
    Paste: (row.Paste || 0) / total,
    Beverages: (row.Beverages || 0) / total,
  };
});

export const Proportion = Template.bind();
Proportion.storyName = "100% Stacked bar";

Proportion.args = {
  data: newData,
  id: "full-stacked-bar",
  tooltip: {},
  tickFormat: "%",
};

export const Labels = Template.bind();
Labels.storyName = "Add Labels";

Labels.args = {
  id: "simple-bar-chart-labels",
  drawing: { duration: 1000 },
  dataLabels: {},
};

export const ReferenceLines = Template.bind({});
ReferenceLines.storyName = "Add Reference lines";

ReferenceLines.args = {
  id: "with-reference-lines",
  referenceLines: [{ x: 2500, className: "text-red-300 dashed" }],
};
