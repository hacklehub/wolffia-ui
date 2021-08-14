import React from "react";
import addons from "@storybook/addons";
import { addDecorator } from "@storybook/react";

import Layout from "./Layout";

export const parameters = {
  layout: "fullscreen"
};

addDecorator(storyFn => <Layout>{storyFn()}</Layout>);
