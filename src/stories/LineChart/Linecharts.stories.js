import React, { useState, lazy, Suspense } from "react";

// Storybook
import { storiesOf } from "@storybook/react";

import LineChart from "../../charts/LineChart";

import { DateTime } from "luxon";

const stories = storiesOf("LineCharts", module);
const randBetween = (x, y) => x + Math.random() * (y - x);

stories.add("Simple LineChart", () => {
  const [data, setData] = useState([
    { id: 1, value: 1311, reading: -500 },
    { id: 2, reading: 1912 },
    { id: 3, value: 1141 },
    { id: 4, value: 1513 },
    { id: 5, value: 1351, reading: 1400 },
    { id: 6, value: 1451 }
  ]);

  return (
    <>
      <div className="w-100 h-60">
        <LineChart
          id="new-line"
          data={data}
          className="bg-white rounded"
          x={{ key: "id", start: 0, end: 7, axisLabel: "Date" }}
          showGuidelines={true}
          y={[
            {
              key: "value",
              start: 0,
              axis: "left",
              curve: "step",
              className: "stroke-current text-red-500",
              width: 3
            },
            {
              key: "reading",
              start: 0,
              axis: "left",
              symbol: "diamond"
            }
          ]}
          tooltip={{ className: "bg-white border-2 p-2 rounded" }}
        />
      </div>
    </>
  );
});

stories.add("Time series", () => {
  const arrayLength = 50;
  const newData = new Array(arrayLength).fill("").map((_, index) => ({
    date: DateTime.now()
      .startOf("day")
      .minus({ days: arrayLength - index })
      .toFormat("yyyy-MM-dd hh:mm:ss"),
    value: randBetween(1000, 1004) + randBetween(index - 10, index)
  }));

  return (
    <>
      <LineChart
        id="time-series"
        data={newData}
        width={480}
        height={180}
        showGuidelines={true}
        className="bg-black text-gray-300 rounded"
        x={{
          key: "date",
          scalingFunction: "time",
          format: "yyyy-MM-dd hh:mm:ss",
          axisLabel: "Date"
        }}
        y={[
          {
            key: "value",
            curve: curveLinear,
            start: 980,
            axis: "left",
            className: "text-red-200 stroke-current",
            circleFill: true
          }
        ]}
        tooltip={{
          // keys: ["date", "value"],
          html: row =>
            `${DateTime.fromFormat(row.date, "yyyy-MM-dd hh:mm:ss").toFormat(
              "dd MMM"
            )}'s value : <br/><strong>${row.value.toFixed(2)}</strong>`,
          className:
            "bg-white rounded border-2 p-2 transition-opacity duration-500",
          onClick: row => {
            console.log(row);
          }
        }}
      />
    </>
  );
});
