import React, { useState, lazy, Suspense } from "react";

// Storybook
import { storiesOf } from "@storybook/react";
import ScatterPlot from "../../charts/ScatterPlot";

const stories = storiesOf("ScatterPlots", module);

const randBetween = (x, y) => Math.floor(x + Math.random() * (y - x));

const categories = ["Category A", "Category B"];

const colorMap = { "Category A": "#0099FF", "Category B": "#FF5252" };

const classMap = {
  "Category A": "text-blue-500 hover:text-blue-200 ",
  "Category B": "text-red-500 hover:text-red-200",
};

const data = new Array(100).fill("").map(v => ({
  dependant: randBetween(1000, 1500),
  independant: randBetween(300, 500),
  sizeVariable: randBetween(100, 400),
  category: categories[randBetween(0, 2)],
}));

const shapeMap = { "Category A": "diamond", "Category B": "diamond" };

stories.add("Basic Scatterplot", () => {
  return (
    <ScatterPlot
      id="random-scatter"
      className="ring-2 rounded"
      data={data}
      x={{ key: "independant", axisTicks: 10 }}
      y={{
        key: "dependant",
        axisTicks: 10,
      }}
      shape={{ key: "category", shape: "square" }}
      size={{ key: "sizeVariable", min: 10, max: 40 }}
      classNamePoints={{ key: "category", classMap }}
      style={{ opacity: "0.5" }}
      tooltip={{
        html: row =>
          `<div class="m-2 p-2 rounded dark:bg-gray-500 bg-white ${
            classMap[row.category]
          }">${row.sizeVariable}</div>`,
      }}
      width={480}
      height={300}
      paddingBottom={10}
      paddingLeft={10}
      zooming={{ min: 0.5, max: 5 }}
      drawing={{ duration: 1000, delay: 50 }}
      onClick={(e, d) => {
        console.log(d);
      }}
    />
  );
});
