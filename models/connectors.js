import mongoose from "mongoose";

// Connector schema definition
const connectorSchema = new mongoose.Schema({
    markers: {
        type: [
            {
                latitude: {
                    type: Number,
                    required: true,
                    validate: {
                        validator: (v) => v >= -90 && v <= 90,
                        message: 'Invalid latitude value',
                    }
                },
                longitude: {
                    type: Number,
                    required: true,
                    validate: {
                        validator: (v) => v >= -180 && v <= 180,
                        message: 'Invalid longitude value',
                    }
                }
            }
        ],
        required: true
    }
});

// Create Connector model
const Connector = mongoose.model('connectors', connectorSchema);

export default Connector;
