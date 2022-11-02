const mongoose = require('mongoose');

const bookFlight = mongoose.Schema(
  {
    passenger_name: {
      type: String,
      required: [true, 'Please provide name of Passenger '],
    },
    email: {
      type: String,
      required: [true, 'Please provide email '],
    },
    contact_number: {
      type: Number,
      required: [true, 'Please provide phone number'],
    },
    DOB: {
      type: String,
      required: [true, 'Please provide date of birth'],
    },
    address: {
      type: String,
      required: [true, 'Please provide address of the passenger'],
    },
    emergency_person_name: {
      type: String,
      required: [true, 'Please provide emergency person name'],
    },
    emergency_contact_number: {
      type: Number,
      required: [true, 'Please provide emergency person contact'],
    },
    emergency_contact_email: {
      type: String,
      required: [true, 'Please provide emergency person email'],
    },
    flight_class: {
      type: String,
      required: [true, 'Please provide flight type'],
      enum: {
        values: ['Economy', 'Business', 'First'],
        message: '{VALUE} is not supported',
      },
    },
    billed: {
      type: Boolean,
      required: [true, 'Please provide bill to continue'],
    },
    seat_no: {
      type: String,
      required: [true, 'Please provide end time of the flight'],
    },
    subtotal: {
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    flight: {
      type: mongoose.Schema.ObjectId,
      ref: 'DepartureFlight',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model('bookFlight', bookFlight);
