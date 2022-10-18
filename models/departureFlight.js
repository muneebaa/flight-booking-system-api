const mongoose = require('mongoose');

const DepartureFlight = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company'],
      enum: {
        values: [
          'Pakistan Air Lines',
          'Qatar Air Lines',
          'Hawaiian Air Lines',
          'Japan Air Lines',
          'Delta Air Lines',
          'Korean Air Lines',
          'EVA Air',
          'Air France Lines',
          'Emirates Air Lines',
        ],
        message: '{VALUE} is not supported',
      },
    },
    takeOffCity: {
      type: String,
      required: [true, 'Please provide take off city '],
    },
    landingCity: {
      type: String,
      required: [true, 'Please provide landing city '],
    },
    price: {
      type: Number,
      required: [true, 'Please provide price of the flight'],
    },
    timeStart: {
      type: String,
      required: [true, 'Please provide start time of the flight'],
    },
    timeEnd: {
      type: String,
      required: [true, 'Please provide end time of the flight'],
    },
    stops: {
      type: String,
      required: [true, 'Please provide end time of the flight'],
    },
    stopTime: {
      type: String,
      required: [true, 'Please provide stop time of the flight'],
    },
    stopDestination: {
      type: String,
      required: [true, 'Please provide stop designation of the flight'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    flight: {
      type: mongoose.Schema.ObjectId,
      ref: 'Flight',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DepartureFlight', DepartureFlight);
