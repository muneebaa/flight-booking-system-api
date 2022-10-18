const mongoose = require('mongoose');

const bookFlight = mongoose.Schema(
  {
    flightClass: {
      type: String,
      required: [true, 'Please provide flight type'],
      enum: {
        values: ['Economy', 'Business', 'First'],
        message: '{VALUE} is not supported',
      },
    },
    name: {
      type: String,
      required: [true, 'Please provide name of Passenger '],
    },
    email: {
      type: String,
      required: [true, 'Please provide email '],
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Please provide phone number'],
    },
    address: {
      type: String,
      required: [true, 'Please provide address of the passenger'],
    },
    seatNo: {
      type: String,
      required: [true, 'Please provide end time of the flight'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
    },
    tax: {
      type: Number,
      required: [true, 'Please provide tax'],
    },
    total: {
      type: Number,
      required: [true, 'Please provide totalAmount'],
    },
    billed: {
      type: Boolean,
      required: [true, 'Please provide bill to continue'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    departureFlight: {
      type: mongoose.Schema.ObjectId,
      ref: 'DepartureFlight',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model('bookFlight', bookFlight);
