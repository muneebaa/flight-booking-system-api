const mongoose = require('mongoose');

let event = new Date('August 19, 1975 23:15:30 GMT+00:00');

const Flights = mongoose.Schema(
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
    origin: {
      type: String,
      required: [true, 'Please provide take off city '],
    },
    destination: {
      type: String,
      // required: [true, 'Please provide landing city '],
    },
    price: {
      type: Number,
      required: [true, 'Please provide price of the flight'],
    },
    depart_time: {
      type: Date,
      default: new Date('August 19, 1975 23:15:30 GMT+00:00'),
      // required: [true, 'Please provide departure time of the flight'],
    },
    arrival_time: {
      type: Date,
      default: new Date('July 20, 69 20:17:40 GMT+00:00'),
      // required: [true, 'Please provide arrival time of the flight'],
    },
    total_seats: {
      type: Number,
      default: 0,
    },
    available_seats: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    place: {
      type: mongoose.Schema.ObjectId,
      ref: 'Places',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Flights', Flights);
