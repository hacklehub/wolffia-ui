import SpeedometerChart from "../../charts/SpeedometerChart";

export default {
  title: "Gauges/Speedometer Chart",
  component: SpeedometerChart,
  args: {
    data: 1,
    regions: [
      {
        limit: 1.2,
        className: "text-green-500",
      },
      {
        limit: 1.6,
        className: "text-yellow-400",
      },
      {
        limit: 2,
        className: "text-red-500",
      },
    ],
  },
};

const Template = args => <SpeedometerChart {...args} />;

export const Simple = Template.bind({});
Simple.storyName = "Speedometer Chart";

Simple.args = {
  id: "simple-speedometer-gauge",
};

export const Labels = Template.bind({});
Labels.storyName = "with label";

Labels.args = {
  id: "labels-speedometer-gauge",
  label: "Error Rate",
};
