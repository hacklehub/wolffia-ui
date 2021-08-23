## Wolffia-UI

Wolffia-UI (named after [Wolffia](https://en.wikipedia.org/wiki/Wolffia) - The smallest flower) is our data visualization layer, based on D3 and Tailwind.

- Responsive
- consistent and easy to style
- Support theming (Dark theme)
- Support interactivity

[Demo](https://pikkol.github.io/wolffia-ui);

## Getting started

1. Create react app (https://create-react-app.dev/docs/getting-started)
2. Install tailwindcss to your react app (https://tailwindcss.com/docs/guides/create-react-app)
3. Install peer dependency - d3, luxon (if you are using line-charts, luxon will be removed at a later release)

4. To install wolffia-ui to your React app, 

    npm install --save wolffia-ui

### Usage

To import a chart,

    import { LineChart } from "wolffia-ui";

    const Component = (props) => {
        const data = [];
        return (
            <>
                <LineChart 
                    id="new-line" // This is a required prop
                    data={data}   // This is a required prop
                    {...otherProps}
                />
            </>
        );
    }

    export default component;

## Features

### Based on D3js & Tailwind

Basing the visualization layer on d3 gives us the flexibility to customize charts. Using tailwind gives us a light-weight CSS layer and ease of styling.

### Stateless

States are managed in the component it is called from, thus giving the developer the flexibility to change things as they see fit.

## Things to remember

1. Every chart needs a unique **id**.

Why?
This is done so, so that D3 can target the correct chart in case multiple charts are there on the page.

2. margin{Left/Right/Bottom/Top} and padding{Left/Right/Bottom/Top} props of charts refer to the chart area (not the entire svg). The svg can be styled using the className prop of the chart.

3. Normal text color is black and dark mode text is white. Normal background is white, while dark mode background color is bg-gray-900 https://tailwindcss.com/docs/customizing-colors. Customize this globally across your app by targeting `.chart` class.

4. Individual components of a chart can be given classes by className{componentName} prop. Refer to that chart's documentation of how to target that component.

## Storybook notes:

If you are new to storybook, please go through the below notes.

1. There are two crescent moon icons at the top, which toggles two dark modes.
   a. Toggle the left one to toggle dark mode on the rendered canvas (applies tailwind)
   b. Toggle the right one to toggle dark mode on storybook (does NOT work on the rendered canvas, or the charts)

The purposes of both are different. The first one is for UI development, the second is for viewers to choose how they want to read the docs.
Please click both on "Canvas" mode to see actual dark mode.

2. To view multiple screen-sizes, Click the multi-screen icon at the top. Once you change orientation, refresh the chart for the new layout to take effect.
