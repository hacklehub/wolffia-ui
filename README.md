## Wolffia-UI

Wolffia-UI (named after Wolffia - The smallest flower) is our data visualization layer, based on D3 and Tailwind.

## Getting started

To install wolffia-ui to your React app, 

    npm install --save wolffia-ui

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