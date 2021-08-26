import RingGauge from "../../charts/RingGauge";

const metrics = [
  {
    name: "Target 1",
    score: 75,
    target: 90,
    className: "text-purple-700",
  },
  {
    name: "Target 2",
    score: 75,
    target: 80,
    className: "text-purple-400",
  },
  {
    name: "Target 3",
    score: 70,
    target: 55,
    className: "text-green-500",
  },
];

export default {
  title: "Gauges/Ring Gauge",
  component: RingGauge,
  args: {
    data: metrics,
    labelKey: "name",
    targetKey: "target",
    dataKey: "score",
  },
};

const Template = args => <RingGauge {...args} />;

export const Simple = Template.bind({});
Simple.storyName = "Simple Ring Gauge";

Simple.args = {
  id: "simple-ring-gauge",
};

export const Labels = Template.bind({});
Labels.storyName = "Show labels";

Labels.args = {
  id: "ring-gauge-with-labels",
  labels: {},
};

export const Angles = Template.bind({});
Angles.storyName = "Different start and end angles and label positions";

Angles.args = {
  id: "with-angles",
  startAngle: -90,
  endAngle: 180,
  labels: {
    position: "bottom",
  },
};

export const Tooltip = Template.bind({});
Tooltip.storyName = "Add tooltip";

Tooltip.args = {
  id: "with-tooltip",
  tooltip: {},
};

export const FullRing = Template.bind({});
FullRing.storyName = "Full Ring";

FullRing.args = {
  id: "full-ring",
  tooltip: {},
  startAngle: 0,
  endAngle: 360,
};

export const CustomRing = Template.bind({});
CustomRing.storyName = "Custom Angle ";

CustomRing.args = {
  id: "top-half-ring",
  tooltip: {},
  startAngle: -135,
  endAngle: 135,
};
