import React, { useState, lazy, Suspense } from "react";

// Storybook
import { storiesOf } from "@storybook/react";

import DotPlot from "../../charts/DotPlot";

const stories = storiesOf("DotPlots", module);

const data = [
  { month: "Jan", minimum: 15, maximum: 20 },
  { month: "Feb", minimum: 18, maximum: 28 },
  { month: "Mar", minimum: 25, maximum: 34 },
  { month: "Apr", minimum: 27, maximum: 35 },
  { month: "May", minimum: 29, maximum: 38 },
  { month: "Jun", minimum: 27, maximum: 35 },
];

stories.add("Getting started", () => {
  return (
    <>
      <DotPlot
        id="climate-month-wise"
        data={data}
        className="text-green-400"
        classNameData="text-green-800"
        tooltip={{
          className: "bg-white p-2 rounded border-black border",
        }}
        height={200}
        y={{ key: "month" }}
        x={{ minKey: "minimum", maxKey: "maximum", minValue: 0, maxValue: 45 }}
        zooming={true}
      />
    </>
  );
});
