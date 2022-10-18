const mongoose = require('mongoose');

const FlightsSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      trim: true,
      required: [true, 'Please provide flight country'],
      maxlength: [100, 'Name can not be more than 20 characters'],
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'Please provide flight city'],
      maxlength: [100, 'Name can not be more than 20 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide flight description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

FlightsSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'flight',
  justOne: false,
  // match :{rating:5} // for getting all reviews with rating 5
});

FlightsSchema.virtual('departureFlights', {
  ref: 'DepartureFlight',
  localField: '_id',
  foreignField: 'flight',
  justOne: false,
});

// FlightsSchema.pre('remove', async () => {
//   await this.model(Review).deleteMany({ flight: this._id });
// });

module.exports = mongoose.model('Flight', FlightsSchema);
