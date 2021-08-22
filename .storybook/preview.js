import { themes } from "@storybook/theming";

import React from "react";
import addons from "@storybook/addons";
import { addDecorator } from "@storybook/react";

import Layout from "./Layout";

export const parameters = {
  layout: "fullscreen",
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark },
    // Override the default light theme
    light: { ...themes.normal },
  },
};

export const globalTypes = {
  darkMode: true,
};

addDecorator(storyFn => <Layout>{storyFn()}</Layout>);
