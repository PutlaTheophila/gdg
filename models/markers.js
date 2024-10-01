import mongoose from "mongoose";

// Coordinate validators
const coordinateValidator = (value) => {
    return value >= -90 && value <= 90; // For latitude
};

const longitudeValidator = (value) => {
    return value >= -180 && value <= 180; // For longitude
};

// Marker schema definition
const markerSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
        validate: [coordinateValidator, 'Invalid latitude value'],
    },
    longitude: {
        type: Number,
        required: true,
        validate: [longitudeValidator, 'Invalid longitude value'],
    },
    label: {
      type: String,
      maxlength: [10, 'Label must be 5 characters or less.'], 
    },
});

const Marker = mongoose.model('markers', markerSchema);

export default Marker;
