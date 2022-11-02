const mongoose = require('mongoose');

const Seats = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Please provide seat type'],
      enum: {
        values: ['First', 'Business', 'Economy'],
        message: '{VALUE} is not supported',
      },
    },
    number: {
      type: String,
      required: [true, 'Please provide seat type'],
    },

    booked: {
      type: Boolean,
      required: [true, 'Please tell if seat is booked or not'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    flight: {
      type: mongoose.Schema.ObjectId,
      ref: 'flight',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Seats', Seats);
