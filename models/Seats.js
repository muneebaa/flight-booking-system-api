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
    isChecked: {
      type: Boolean,
      default: false,
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

Seats.statics.calculateAverageRating = async function (flightId) {
  console.log(flightId);
  const result = await this.aggregate([
    {
      $match: {
        flight: flightId,
      },
    },
    {
      $group: {
        _id: null,
        total_seats: {
          $sum: 1,
        },
      },
    },
  ]);
  try {
    await this.model('Flights').findOneAndUpdate(
      { _id: flightId },
      {
        total_seats: result[0]?.total_seats || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
  // const result = await this.aggregate([
  //   { $match: { product: productId } },
  //   {
  //     $group: {
  //       _id: null,
  //       averageRating: { $avg: '$rating' },
  //       numOfReviews: { $sum: 1 },
  //     },
  //   },
  // ]);
  // try {
  //   await this.model('Product').findOneAndUpdate(
  //     { _id: productId },
  //     {
  //       averageRating: Math.ceil(result[0]?.averageRating || 0),
  //       numOfReviews: result[0]?.numOfReviews || 0,
  //     }
  //   );
  // } catch (error) {
  //   console.log(error);
  // }
};

Seats.post('save', async function () {
  await this.constructor.calculateAverageRating(this.flight);
});

Seats.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.flight);
});

module.exports = mongoose.model('Seats', Seats);
