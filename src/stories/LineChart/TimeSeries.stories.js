import LineChart from "../../charts/LineChart/index";
import { DateTime } from "luxon";
import "../styles.css";

const randBetween = (x, y) => x + Math.random() * (y - x);

const arrayLength = 200;
const data = new Array(arrayLength).fill("").map((_, index) => ({
  date: DateTime.now()
    .startOf("day")
    .minus({ days: arrayLength - index })
    .toFormat("yyyy-MM-dd hh:mm:ss"),
  value: randBetween(1000, 1004) + randBetween(index - 10, index),
  reading: randBetween(1000, 996) - randBetween(index - 10, index),
}));

export default {
  title: "Serial data/Time Series/Getting Started",
  component: LineChart,
  args: {
    data,
  },
};

const Template = args => <LineChart {...args} />;

export const TimeSeries = Template.bind();

TimeSeries.storyName = "Time Series";

TimeSeries.args = {
  id: "time-series",
  data,
  x: {
    key: "date",
    scalingFunction: "time",
    format: "yyyy-MM-dd hh:mm:ss",
    axisLabel: "Date",
  },
  y: [
    {
      key: "value",
      axis: "left",
      start: 0,
      className: "text-red-200 dark:text-red-700 stroke-current",
      curve: "rounded",
      circleFill: true,
    },
    {
      key: "reading",
      className: "text-blue-200 dark:text-blue-700",
      axis: "left",
      symbol: "none",
    },
  ],
  referenceLines: [
    { yLeft: 1000, className: "text-gray-200 dashed", showText: true },
  ],
};
