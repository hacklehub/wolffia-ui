import React, { useState, lazy, Suspense } from "react";

// Storybook
import { storiesOf } from "@storybook/react";

import LineChart from "../../charts/LineChart";

import { DateTime } from "luxon";

import { curveLinear, curveStep } from "d3";

const stories = storiesOf("LineCharts", module);
const randBetween = (x, y) => x + Math.random() * (y - x);

stories.add("Simple LineChart", () => {
  const [data, setData] = useState([
    { id: 1, value: 1311, reading: 1144 },
    { id: 2, value: 1111, reading: 1912 },
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
          x={{ key: "id" }}
          showGuidelines={true}
          y={[
            {
              key: "value",
              color: "#FF5252",
              start: 0,
              axis: "right",
              curve: curveStep,
              end: 1500,
              width: 3
            },
            {
              key: "reading",
              // Todo style: "dashed",
              start: 0,
              axis: "right",
              curve: curveLinear,
              color: "#439d"
            }
          ]}
        />
      </div>
    </>
  );
});

stories.add("Time series", () => {
  const arrayLength = 50;
  const newData = new Array(arrayLength).fill("").map((_, index) => ({
    date: DateTime.now()
      .endOf("day")
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
        className="bg-white rounded"
        showGuidelines={true}
        x={{
          key: "date",
          scalingFunction: "time",
          format: "yyyy-MM-dd hh:mm:ss"
        }}
        y={[
          {
            key: "value",
            curve: curveLinear,
            start: 980,
            axis: "left",
            axis: "right"
          }
        ]}
      />
    </>
  );
});
