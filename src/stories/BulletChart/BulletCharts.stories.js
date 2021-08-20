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
        id="bullet-jan"
        className="dark:text-white "
        label="January"
        data={108}
        base={90}
        target={105}
        threshold={110}
        max={120}
      />
      <BulletChart
        id="bullet-feb"
        className="dark:text-white "
        classNameData="text-blue-400 dark:text-blue-800 "
        label="February"
        data={111}
        base={90}
        target={102}
        threshold={110}
        max={120}
      />
    </div>
  );
});
