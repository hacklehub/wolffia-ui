import React, { useState, lazy, Suspense } from "react";

// Storybook
import { storiesOf } from "@storybook/react";

import LineChart from "../../charts/LineChart/index";

import { DateTime } from "luxon";

import "./styles.css";

const stories = storiesOf("LineCharts", module);
const randBetween = (x, y) => x + Math.random() * (y - x);

const data = [
  { id: 1, value: 1311, reading: 1500 },
  { id: 2, reading: 1912 },
  { id: 3, value: 1000 },
  { id: 4, value: 1513 },
  { id: 5, value: 1351, reading: 1000 },
  { id: 6, value: 1451, reading: 1200 },
];

stories.add("Getting started", () => {
  return (
    <>
      <div className="">
        Line charts are useful for showing linear trends in data. The x & y
        variables in a line chart need to be numerical (x-axis variable can be a
        timestamp as well for time series data).
        <LineChart
          id="new-line"
          data={data}
          x={{ key: "id" }}
          y={[
            {
              key: "value",
            },
            {
              key: "reading",
            },
          ]}
        />
      </div>
    </>
  );
});

stories.add("add classNames to series", () => {
  return (
    <>
      <div className="">
        Series can be formatted by adding tailwind classNames to them.
        <LineChart
          id="new-line"
          data={data}
          className="rounded text-gray-500 dark:text-white"
          x={{ key: "id" }}
          y={[
            {
              key: "value",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              className: "stroke-current text-green-500",
            },
          ]}
        />
        For more customized styling, feel free to add your own custom classNames
        and styles.
        <LineChart
          id="custom-styling-line"
          data={data}
          className="rounded text-gray-500 dark:text-white"
          x={{ key: "id" }}
          y={[
            {
              key: "value",
              className: "custom-series-1",
            },
            {
              key: "reading",
              className: "custom-series-2 running",
            },
          ]}
        />
      </div>
    </>
  );
});

stories.add("Styling the chart", () => {
  return (
    <>
      <div className="">
        Tailwind classes to the entire chart
        <LineChart
          id="chart-styling-demo"
          data={data}
          className="rounded bg-red-50 hover:bg-red-100 dark:bg-red-900 "
          x={{ key: "id" }}
          y={[
            {
              key: "value",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              className: "stroke-current text-green-500",
            },
          ]}
        />
        W-, H- classes won't work though. Specify width & height as prop. This
        is because d3 computations are based on this
        <LineChart
          id="chart-styling-width-demo"
          data={data}
          width={320}
          height={120}
          className="rounded bg-red-50 hover:bg-red-100 dark:bg-red-900"
          x={{ key: "id" }}
          y={[
            {
              key: "value",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              className: "stroke-current text-green-500",
            },
          ]}
        />
        Add Padding to a chart. Padding is the space between the drawn axis and
        the chart area
        <LineChart
          id="chart-styling-padding-demo"
          data={data}
          width={320}
          height={120}
          paddingTop={10}
          paddingBottom={10}
          paddingLeft={10}
          paddingRight={10}
          className="rounded bg-red-50 hover:bg-red-100 dark:bg-red-900"
          x={{ key: "id" }}
          y={[
            {
              key: "value",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              className: "stroke-current text-green-500",
            },
          ]}
        />
      </div>
    </>
  );
});

stories.add("x-axis customization", () => {
  return (
    <>
      <div className="">
        Axis at the top
        <LineChart
          id="x-axis-top-demo"
          data={data}
          className="rounded text-gray-500 dark:text-white"
          x={{ key: "id", axis: "top" }}
          y={[
            {
              key: "value",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              className: "stroke-current text-green-500",
            },
          ]}
        />
        Custom Axis ticks
        <LineChart
          id="x-axis-ticks-demo"
          data={data}
          className="rounded text-gray-500 dark:text-white"
          x={{ key: "id", axisTicks: 3 }}
          y={[
            {
              key: "value",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              className: "stroke-current text-green-500",
            },
          ]}
        />
        Axis Label
        <LineChart
          id="x-axis-label-demo"
          data={data}
          className="rounded text-gray-500 dark:text-white"
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              className: "stroke-current text-green-500",
            },
          ]}
        />
        Custom axis start and end
        <LineChart
          id="x-axis-custom-demo"
          data={data}
          className="rounded text-gray-500 dark:text-white"
          x={{ key: "id", axisLabel: "Position", start: 0, end: 7 }}
          y={[
            {
              key: "value",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              className: "stroke-current text-green-500",
            },
          ]}
        />
      </div>
    </>
  );
});

stories.add("y-axis customization", () => {
  return (
    <>
      <div className="">
        Left and right axis demo
        <LineChart
          id="multi-axis-demo-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              axis: "right",
              className: "stroke-current text-green-500",
            },
          ]}
        />
        Custom start & end point on y-axis scales
        <LineChart
          id="multi-axis-custom-start-end-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              start: 0,
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              axis: "right",
              end: 3000,
              className: "stroke-current text-green-500",
            },
          ]}
        />
        Custom ticks
        <LineChart
          id="multi-axis-custom-ticks-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              start: 0,
              ticks: 3,
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              axis: "right",
              end: 3000,
              ticks: 3,
              className: "stroke-current text-green-500",
            },
          ]}
        />
        Customize symbol (shape and size)
        <LineChart
          id="multi-axis-custom-symbol-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              start: 0,
              ticks: 3,
              symbol: "diamond",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              axis: "right",
              symbol: "triangle",
              size: 25,
              end: 3000,
              ticks: 3,
              className: "stroke-current text-green-500",
            },
          ]}
        />
        Customize what to do if series value is Undefined or unknown
        <LineChart
          id="multi-axis-custom-unknown-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              ticks: 3,
              symbol: "diamond",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              axis: "right",
              symbol: "triangle",
              size: 25,
              start: 0,
              unknown: "zero",
              ticks: 3,
              className: "stroke-current stroke-2 text-green-500",
            },
          ]}
        />
        Y axis - custom label
        <LineChart
          id="multi-axis-custom-label-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              ticks: 3,
              symbol: "diamond",
              axisLabel: "Value",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              axis: "right",
              symbol: "triangle",
              axisLabel: "Reading",
              size: 25,
              start: 0,
              unknown: "zero",
              ticks: 3,
              className: "stroke-current stroke-2 text-green-500",
            },
          ]}
        />
        Customized curve
        <LineChart
          id="multi-axis-custom-curve-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              ticks: 3,
              symbol: "diamond",
              curve: "step",
              axisLabel: "Value",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              axis: "left",
              symbol: "triangle",
              axisLabel: "Reading",
              size: 25,
              curve: "rounded",
              ticks: 3,
              className: "stroke-current  text-green-500",
            },
          ]}
        />
        Custom Curve
      </div>
    </>
  );
});

stories.add("Tooltip", () => {
  return (
    <>
      <div className="">
        Simplest Tooltip - hover over the chart
        <LineChart
          id="tooltip-demo-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              axis: "right",
              className: "stroke-current text-green-500",
            },
          ]}
          tooltip={{ keys: ["id", "value", "reading"] }}
        />
        Show Guide-lines
        <LineChart
          id="guidelines-demo-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              axis: "right",
              className: "stroke-current text-green-500",
            },
          ]}
          showGuidelines={true}
          tooltip={{}}
        />
        Custom style tooltip (with tailwind classes)
        <LineChart
          id="tooltip-className-demo-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              axis: "right",
              className: "stroke-current text-green-500",
            },
          ]}
          tooltip={{
            keys: ["id", "value", "reading"],
            className: "bg-white rounded ring-2 p-2",
          }}
          showGuidelines={true}
        />
      </div>
    </>
  );
});

stories.add("Reference Lines", () => {
  return (
    <>
      <div>
        Vertical Reference Lines
        <LineChart
          id="tooltip-demo-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              start: 0,
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              className: "stroke-current text-green-500",
            },
          ]}
          referenceLines={[
            { x: 4, className: "stroke-current text-blue-200 stroke-2" },
          ]}
        />
        Horizontal Reference Lines (add equation)
        <LineChart
          id="horiz-refer-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              start: 0,
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              className: "stroke-current text-green-500",
            },
          ]}
          // tooltip={{ keys: ["id", "value", "reading"] }}
          referenceLines={[
            {
              yLeft: 1200,
              className: "text-blue-200 stroke-2",
              showText: true,
            },
          ]}
        />
      </div>
    </>
  );
});

stories.add("Zoom", () => {
  return (
    <>
      <div>
        Zoom over a region of the chart by dragging. Undo the zoom by double
        clicking anywhere on the chart
        <LineChart
          id="horiz-refer-chart"
          data={data}
          x={{ key: "id", axisLabel: "Position" }}
          y={[
            {
              key: "value",
              axis: "left",
              start: 0,
              className: "stroke-current text-red-500",
            },
            {
              key: "reading",
              axis: "right",
              className: "stroke-current text-green-500",
            },
          ]}
          paddingLeft={15}
          // tooltip={{ keys: ["id", "value", "reading"] }}
          zooming={true}
        />
      </div>
    </>
  );
});

stories.add("Time series", () => {
  const arrayLength = 200;
  const newData = new Array(arrayLength).fill("").map((_, index) => ({
    date: DateTime.now()
      .startOf("day")
      .minus({ days: arrayLength - index })
      .toFormat("yyyy-MM-dd hh:mm:ss"),
    value: randBetween(1000, 1004) + randBetween(index - 10, index),
    reading: randBetween(1000, 996) - randBetween(index - 10, index),
  }));

  return (
    <>
      <LineChart
        id="time-series"
        data={newData}
        width={480}
        height={180}
        showGuidelines={true}
        className="rounded text-gray-500 dark:text-gray-100"
        x={{
          key: "date",
          scalingFunction: "time",
          format: "yyyy-MM-dd hh:mm:ss",
          axisLabel: "Date",
        }}
        y={[
          {
            key: "value",
            axis: "left",
            start: 0,
            symbol: "none",
            className: "text-red-200 stroke-current",
            curve: "rounded",
            circleFill: true,
          },
          {
            key: "reading",
            axis: "left",
            symbol: "none",
          },
        ]}
        tooltip={{
          // keys: ["date", "value"],
          html: row =>
            `${DateTime.fromFormat(row.date, "yyyy-MM-dd hh:mm:ss").toFormat(
              "dd MMM",
            )}'s <br/> value : <strong>${row.value.toFixed(2)}</strong> <br/>
            reading : <strong>${row.reading.toFixed(2)}</strong>
            `,
          className:
            "bg-white rounded border-2 p-2 transition-opacity duration-500",
          onClick: row => {
            console.log(row);
          },
        }}
        paddingBottom={10}
        zooming={{
          enable: true,
          min: 1,
          max: 10,
        }}
        referenceLines={[
          {
            x: DateTime.now()
              .minus({ days: 10 })
              .toFormat("yyyy-MM-dd hh:mm:ss"),
            className: "text-red-900",
          },
          {
            x: DateTime.now()
              .minus({ days: 30 })
              .toFormat("yyyy-MM-dd hh:mm:ss"),
            className: "text-blue-500",
          },
          {
            yLeft: 1000,
            className: "stroke-current text-green-500",
            showText: true,
          },
        ]}
      />
    </>
  );
});
