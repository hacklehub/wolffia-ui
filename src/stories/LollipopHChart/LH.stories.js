import React, { useState, lazy, Suspense } from "react";

// Storybook
import { storiesOf } from "@storybook/react";

import LollipopHorizontalChart from "../../charts/LollipopHChart";

import { DateTime } from "luxon";

const stories = storiesOf("Lollipop-H", module);

stories.add("Simple Lollipop Horizontal", () => {
  const data = [
    { reading: 110, name: "Category 1" },
    { reading: 100, name: "Category 2" },
    { reading: 80, name: "Category 3" },
    { reading: 90, name: "Category 4" }
  ];

  return (
    <>
      <div className="w-100 h-60">
        <LollipopHorizontalChart
          data={data}
          id="lollipop-horizontal"
          value="reading"
          valueMin={0}
          label="name"
        />
      </div>
    </>
  );
});
