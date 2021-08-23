import LinearGauge from "../../charts/LinearGauge";

const data = 0.75;

export default {
  title: "Gauges/Linear Gauge",
  component: LinearGauge,
  argTypes: {
    data: {},
  },
  args: {
    data,
  },
};

const Template = args => <LinearGauge {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Simple Linear Gauge";

Simple.args = {
  id: "simple-linear-gauge",
  label: "Task completion ",
};

export const Styled = Template.bind();
Styled.storyName = "Linear Gauge style based on value";

Styled.args = {
  id: "styled-linear-gauge",
  label: "Task completion",
  classNameGauge:
    data < 0.6
      ? "text-red-700"
      : data < 0.8
      ? "text-yellow-600"
      : "text-green-600",
};

export const Tooltip = Template.bind();
Tooltip.storyName = "Tooltip";

Tooltip.args = {
  id: "tooltip-linear-gauge",
  label: "Task Completion",
  tooltip: {
    className: "ring-1",
  },
};

export const CustomTooltip = Template.bind();
CustomTooltip.storyName = "Customize the tooltip";

CustomTooltip.args = {
  id: "custom-tooltip",
  label: "Task completion",
  tooltip: {
    html: data => `${data * 100} % done`,
  },
};

export const ErrorGauge = Template.bind();
ErrorGauge.storyName = "With errors";

ErrorGauge.args = {
  id: "with-error-gauge",
  label: "Task completion",
  error: {
    data: 0.2,
    className: "text-red-400 dark:text-red-700",
  },
};
