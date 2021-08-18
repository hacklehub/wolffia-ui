import React, { useState, lazy, Suspense } from "react";

// Storybook
import { storiesOf } from "@storybook/react";

import LollipopVChart from "../../charts/LollipopVChart";

import { DateTime } from "luxon";

const stories = storiesOf("Lollipop-V", module);

stories.add("Simple Lollipop Vertical", () => {
  const data = [
    { reading: 110, name: "Category 1" },
    { reading: 100, name: "Category 2" },
    { reading: 80, name: "Category 3" },
    { reading: 90, name: "Category 4" },
  ];

  return (
    <>
      <div className="">
        <LollipopVChart
          data={data}
          height={100}
          paddingBottom={20}
          id="lollipop-horizontal"
          className="text-green-500 dark:text-green-100"
          classNamePoints="text-green-500 dark:text-green-100"
          y={{
            key: "reading",
            axisTicks: 2,
          }}
          x={{
            key: "name",
          }}
          valueMin={0}
        />
      </div>
    </>
  );
});
