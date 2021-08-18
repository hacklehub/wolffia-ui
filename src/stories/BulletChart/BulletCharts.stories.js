import React, { useState, lazy, Suspense } from "react";

// Storybook
import { storiesOf } from "@storybook/react";

import BulletChart from "../../charts/BulletChart";

import { DateTime } from "luxon";

const stories = storiesOf("BulletCharts", module);

stories.add("Getting started", () => {
  return (
    <div>
      <BulletChart
        id="bullet-start"
        className="dark:text-white "
        label="Bangalore"
        data={100}
        min={80}
        base={90}
        threshold={110}
        max={120}
      />
    </div>
  );
});
