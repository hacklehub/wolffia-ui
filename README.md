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

                />
            </>
        );
    }

    export default component;


