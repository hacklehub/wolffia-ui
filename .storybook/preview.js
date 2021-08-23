import { themes } from "@storybook/theming";

import React from "react";
import addons from "@storybook/addons";
import { addDecorator } from "@storybook/react";

import Layout from "./Layout";

import "./styles.css";

export const parameters = {
  layout: "fullscreen",
};

export const globalTypes = {
  darkMode: true,
};

addDecorator(storyFn => <Layout>{storyFn()}</Layout>);
