import React, { useState, lazy, Suspense } from "react";

// Storybook
import { storiesOf } from "@storybook/react";

import BarChartGrouped from "../../charts/BarChartGrouped";
import BarChartStacked from "../../charts/BarChartStacked";

import { DateTime } from "luxon";

const stories = storiesOf("BarCharts", module);

const data = [
  { name: "Product A", USA: 10000, Europe: 4000, APAC: 5000, Africa: 1000 },
  { name: "Product B", USA: 9400, Europe: 9000, APAC: 4000 },
  { name: "Product C", USA: 8000, Europe: 4000, APAC: 1000 },
];

stories.add("Simple Grouped bar chart", () => {
  return (
    <>
      <BarChartGrouped
        id="simple-bar-chart"
        className="border rounded"
        data={data}
        direction="left"
        x={[
          {
            key: "USA",
            className: "text-purple-300",
          },
          { key: "Europe", className: "text-purple-500 " },
          /*{
            key: "APAC",
            className: "text-purple-700 ",
          },*/
          // { key: "Africa", className: "text-purple-900" },
        ]}
        y={{ key: "name" }}
        tooltip={{
          className:
            "dark:bg-gray-900 bg-white dark:text-white text-black p-2 border dark:border-white border-black rounded",
        }}
        // drawing={{ duration: 1000 }}
        dataLabel={true}
      />
    </>
  );
});

stories.add("Simple Stacked bar chart", () => {
  return (
    <>
      <BarChartStacked
        data={data}
        id="simple-stacked-bar"
        className="border rounded"
        x={[
          {
            key: "USA",
            className: "text-purple-300 ",
          },
          { key: "Europe", className: "text-purple-500 " },
          {
            key: "APAC",
            className: "text-purple-700",
          },
        ]}
        tooltip={{
          className:
            "dark:bg-gray-900 bg-white dark:text-white text-black p-2 border dark:border-white border-black rounded",
        }}
        y={{ key: "name" }}
        drawing={{ duration: 1000 }}
      />
    </>
  );
});

stories.add("100% Stacked bar chart", () => {
  const newData = data.map(row => {
    const total = row.Europe + row.USA + row.APAC;
    return {
      name: row.name,
      USA: row.USA / total,
      Europe: row.Europe / total,
      APAC: row.APAC / total,
    };
  });
  return (
    <>
      <BarChartStacked
        data={newData}
        id="simple-stacked-bar"
        x={[
          {
            key: "APAC",
            className: "text-purple-700",
          },

          { key: "Europe", className: "text-purple-500 " },
          {
            key: "USA",
            className: "text-purple-300 ",
          },
        ]}
        tickFormat="%"
        tooltip={{
          className:
            "dark:bg-gray-900 bg-white dark:text-white text-black p-2 border dark:border-white border-black rounded",
        }}
        y={{ key: "name" }}
        drawing={{ duration: 1000 }}
      />
    </>
  );
});
