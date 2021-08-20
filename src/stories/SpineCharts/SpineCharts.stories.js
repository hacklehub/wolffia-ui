import React, { useState, lazy, Suspense } from "react";

// Storybook
import { storiesOf } from "@storybook/react";
import SpineChart from "../../charts/SpineChart";

const stories = storiesOf("Spine Charts", module);

stories.add("Getting started", () => {
  const data = [
    {
      ageBucket: "18-25",
      maleYes: 6000,
      maleNo: 5000,
      femaleYes: 6000,
      femaleNo: 4000,
    },
    {
      ageBucket: "26-35",
      maleYes: 4000,
      maleNo: 6000,
      femaleYes: 4000,
      femaleNo: 4000,
    },
  ];

  return (
    <SpineChart
      id="basic-spine"
      data={data}
      className="border rounded"
      x={[
        { key: "maleYes", direction: "left", className: "text-purple-200" },
        { key: "maleNo", direction: "left", className: "text-purple-500" },
        { key: "femaleNo", className: "text-pink-200" }, // Direction right
        { key: "femaleYes", className: "text-pink-500" },
      ]}
      y={{ key: "ageBucket" }}
      paddingLeft={15}
      paddingRight={15}
    />
  );
});
