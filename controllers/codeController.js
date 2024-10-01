import asyncErrorHandler from "../utils/async-error-handler.js";
import Marker from "../models/markers.js";
import Connector from "../models/connectors.js";

// const processCommands = (commands) => {
//     const actions = [];
//     const markCoordinatesArray = [];
//     const connectCoordinatesArray = [];

//     commands.forEach(command => {
//         const parts = command.split('(');
//         const funcName = parts[0].trim();
//         const args = parts[1] ? parts[1].slice(0, -1).split(',').map(arg => arg.trim()) : [];
//         switch (funcName) {
//             case 'mark':
//                 if (args.length === 2) {
//                     const latitude = parseFloat(args[0]);
//                     const longitude = parseFloat(args[1]);
//                     markCoordinatesArray.push({ latitude, longitude }); // Push as an object
//                     actions.push({ action: 'mark', coordinate: { latitude, longitude } });
//                 }
//                 break;
//             case 'connect':
//                 if (args.length >= 4 && args.length % 2 === 0) {
//                     const coordinates = [];
//                     for (let i = 0; i < args.length; i += 2) {
//                         const latitude = parseFloat(args[i]);
//                         const longitude = parseFloat(args[i + 1]);
//                         coordinates.push({ latitude, longitude });
//                     }
//                     connectCoordinatesArray.push(coordinates); // Add the coordinates array to connectCoordinatesArray
//                     actions.push({ action:'connect',coordinates });
//                 }
//                 break;
//             default:
//                 console.warn(`Unknown command: ${funcName}`);
//         }
//     });

//     return {
//         actions,
//         markCoordinates: markCoordinatesArray, // Return the array of mark coordinates
//         connectCoordinates: connectCoordinatesArray, // Return the array of connect coordinates
//     };
// };

const processCommands = (commands) => {
    const actions = [];
    const markCoordinatesArray = [];
    const connectCoordinatesArray = [];

    commands.forEach(command => {
        const parts = command.split('(');
        const funcName = parts[0].trim();
        const args = parts[1] ? parts[1].slice(0, -1).split(',').map(arg => arg.trim()) : [];
        
        switch (funcName) {
            case 'mark':
                // Expecting three arguments: latitude, longitude, and label
                if (args.length === 3) {
                    const latitude = parseFloat(args[0]);
                    const longitude = parseFloat(args[1]);
                    const label = args[2];

                    // Ensure the label is no longer than 5 characters
                    if (label.length > 5) {
                        console.warn('Label is longer than 5 characters. It will be truncated.');
                    }

                    const trimmedLabel = label.slice(0, 5); // Trim label to 5 characters
                    markCoordinatesArray.push({ latitude, longitude, label: trimmedLabel }); // Push as an object with label
                    actions.push({ action: 'mark', coordinate: { latitude, longitude, label: trimmedLabel } });
                }
                break;

            case 'connect':
                // Expecting an even number of arguments for latitude/longitude pairs
                if (args.length >= 4 && args.length % 2 === 0) {
                    const coordinates = [];
                    for (let i = 0; i < args.length; i += 2) {
                        const latitude = parseFloat(args[i]);
                        const longitude = parseFloat(args[i + 1]);
                        coordinates.push({ latitude, longitude });
                    }
                    connectCoordinatesArray.push(coordinates); // Add the coordinates array to connectCoordinatesArray
                    actions.push({ action: 'connect', coordinates });
                }
                break;

            default:
                console.warn(`Unknown command: ${funcName}`);
        }
    });

    return {
        actions,
        markCoordinates: markCoordinatesArray, // Return the array of mark coordinates with label
        connectCoordinates: connectCoordinatesArray, // Return the array of connect coordinates
    };
};



// const label = parseFloat(args[2]);
export const getCode = asyncErrorHandler(async (req, res) => {
    const code = req.body.code; // Assuming you're passing code in the body
    console.log("Received code:", code);
    const commands = code.split(';').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);
    
    const { actions, markCoordinates, connectCoordinates } = processCommands(commands);
    console.log("Mark Coordinates:", markCoordinates);

    // For markers
    if (markCoordinates.length > 0) {
        const createMarkerPromises = markCoordinates.map(({ latitude, longitude ,label }) => {
            return Marker.create({ latitude, longitude ,label }); // Store latitude and longitude as separate fields
        });
        await Promise.all(createMarkerPromises);
        console.log('All markers created successfully');
    }

    // For connectors
    if (connectCoordinates.length > 0) {
        const createConnectorPromises = connectCoordinates.map(coordinates => {
            return Connector.create({ markers: coordinates });
        });
        const connectors = await Promise.all(createConnectorPromises);
        console.log('All connectors created successfully:', connectors);
    }
    res.json({
        status: 'success',
        actions,
        markCoordinates,
        connectCoordinates,
    });
});




export const getAllMarkers  = asyncErrorHandler (async (req , res) =>{
    const markers = await Marker.find({});
    res.json({
        status:'success',
        markers
    })
})


export const getAllConnectors = asyncErrorHandler (async (req , res)=>{
    const connectors = await Connector.find({});
    res.json({
        status:'success',
        connectors
    })
})

