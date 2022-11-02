const mongoose = require('mongoose');

const Places = new mongoose.Schema(
  {
    country: {
      type: String,
      trim: true,
      required: [true, 'Please provide places country'],
      maxlength: [100, 'Name can not be more than 20 characters'],
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'Please provide places city'],
      maxlength: [100, 'Name can not be more than 20 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide places description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// PlacesSchema.virtual('reviews', {
//   ref: 'Review',
//   localField: '_id',
//   foreignField: 'place',
//   justOne: false,
//   // match :{rating:5} // for getting all reviews with rating 5
// });

// PlacesSchema.virtual('departureFlights', {
//   ref: 'DepartureFlight',
//   localField: '_id',
//   foreignField: 'place',
//   justOne: false,
// });

// FlightsSchema.pre('remove', async () => {
//   await this.model(Review).deleteMany({ flight: this._id });
// });

module.exports = mongoose.model('Places', Places);
