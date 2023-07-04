// Yes, it is possible to implement a schema that allows users to pick locations from a world map in the frontend. However, the schema itself does not handle the frontend functionality directly. It focuses on defining the structure and behavior of the data stored in the backend (using Mongoose and MongoDB).

// To enable users to pick locations from a world map in the frontend, you would typically use a frontend framework or library that provides map-related functionality. Some popular choices include Google Maps API, Mapbox, Leaflet, and OpenLayers.

// Here's an updated version of the schema that includes the latitude and longitude fields for the origin and destination:

// In this updated schema, the origin and destination fields are represented as GeoJSON points with coordinates containing an array of [longitude, latitude] values. This structure allows you to perform spatial queries on these fields.

// When integrating this schema with a frontend map component, you would need to handle user interactions and retrieve the selected latitude and longitude coordinates from the map. Then, you can use those coordinates to set the origin and destination fields when creating or updating a Trip document.

// Remember to adjust the frontend implementation accordingly based on the chosen map library or API.


const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  origin: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  destination: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  startMileage: {
    type: Number,
    required: true
  },
  endMileage: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  distance: {
    type: Number
  },
  totalMileage: {
    type: Number
  }
});

// Calculate distance and total mileage before saving the trip
TripSchema.pre('save', function (next) {
  this.distance = calculateDistance(this.origin.coordinates, this.destination.coordinates);
  this.totalMileage = this.endMileage - this.startMileage;
  next();
});

// Using the Haversine formula to calculate the distance between
// two sets of latitude and longitude coordinates
function calculateDistance(origin, destination) {
  const [lat1, lon1] = origin;
  const [lat2, lon2] = destination;

  const earthRadius = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude to radians
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

TripSchema.index({ origin: '2dsphere', destination: '2dsphere' });

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;