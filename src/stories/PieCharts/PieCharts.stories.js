import React, { useState, lazy, Suspense } from "react";

// Storybook
import { storiesOf } from "@storybook/react";

import PieChart from "../../charts/PieChart";

import { DateTime } from "luxon";

const stories = storiesOf("Pie Charts", module);

const data = [
  { name: "Product A", USA: 10000, Europe: 4000, APAC: 5000, Africa: 1000 },
  { name: "Product B", USA: 9400, Europe: 9000, APAC: 4000 },
  { name: "Product C", USA: 8000, Europe: 4000, APAC: 1000 },
];

const classMap = {
  "Product A": "text-purple-700",
  "Product B": "text-purple-500",
  "Product C": "text-purple-300",
};

stories.add("Simple Pie chart", () => {
  const classMap = {
    "Product A": "text-purple-700",
    "Product B": "text-purple-500",
    "Product C": "text-purple-300",
  };
  return (
    <>
      <PieChart
        id="simple-pie-chart"
        className="border rounded"
        data={data}
        classNamePoints={{ classMap }}
        label="name"
        value="USA"
        // drawing={{ duration: 1000 }}
        // labels={{ radius: 1.4 }}
      />
    </>
  );
});

stories.add("Donut Pie chart", () => {
  return (
    <>
      <PieChart
        id="simple-donut-chart"
        className="border rounded"
        data={data}
        classNamePoints={{ classMap }}
        label="name"
        value="USA"
        innerRadius={0.7}
        tooltip={{ className: "p-2" }}
        // drawing={{ duration: 1000 }}
        // labels={{ radius: 1.4 }}
      />
    </>
  );
});

stories.add("Entry Animation", () => {
  return (
    <>
      <PieChart
        id="animated-donut-chart"
        className="border rounded"
        data={data}
        classNamePoints={{ classMap }}
        label="name"
        value="USA"
        innerRadius={0.7}
        tooltip={{ className: "p-2" }}
        drawing={{ duration: 1000 }}
        // labels={{ radius: 1.4 }}
      />
    </>
  );
});

stories.add("Labels", () => {
  return (
    <>
      <PieChart
        id="animated-donut-chart-with-labels"
        className="border rounded"
        data={data}
        classNamePoints={{ classMap }}
        label="name"
        value="USA"
        innerRadius={0.7}
        tooltip={{ className: "p-2" }}
        drawing={{ duration: 1000 }}
        labels={{ radius: 1.2, text: row => row["USA"] }}
      />
    </>
  );
});
