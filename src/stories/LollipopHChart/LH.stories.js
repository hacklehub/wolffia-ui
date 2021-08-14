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
      <div className="">
        <LollipopHorizontalChart
          data={data}
          height={100}
          paddingBottom={20}
          id="lollipop-horizontal"
          className="text-green-500 dark:text-green-100"
          classNamePoints="text-green-500 dark:text-green-100"
          x={{
            key: "reading",
            axisTicks: 2
          }}
          y={{
            key: "name"
          }}
          valueMin={0}
        />
      </div>
    </>
  );
});
