## Wolffia-UI

Wolffia-UI (named after Wolffia - The smallest flower) is our data visualization layer, based on D3 and Tailwind.

## Getting started

1. Create react app (https://create-react-app.dev/docs/getting-started)
2. Install tailwindcss to your react app (https://tailwindcss.com/docs/guides/create-react-app)
3. Install peer dependency - d3, luxon (if you are using line-charts)

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

## Stateless

States are managed in the component it is called from, thus giving the developer the flexibility to change things as they see fit.