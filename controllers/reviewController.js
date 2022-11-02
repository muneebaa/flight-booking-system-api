const Review = require('../models/Review');
const Flight = require('../models/Places');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const createReview = async (req, res) => {
  const { flight: flightId } = req.body;

  const isValidFlight = await Flight.findOne({ _id: flightId });

  if (!isValidFlight) {
    throw new CustomError.NotFoundError(`No flight with id : ${flightId}`);
  }

  const alreadySubmitted = await Review.findOne({
    flight: flightId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Already submitted review for this flight'
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'flight',
    select: 'country city company price',
  });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getCurrentUserReviews = async (req, res) => {
  const reviews = await Review.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id : ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id : ${review}`);
  }

  checkPermissions(req.user, review.user);
  rating && (review.rating = review.rating && rating);
  title && (review.title = review.title && title);
  comment && (review.comment = comment);

  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id : ${review}`);
  }

  checkPermissions(req.user, review.user);

  await review.remove();
  res.status(StatusCodes.OK).json({ msg: 'Review deleted successfully' });
};

const getSingleFlightReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.find({ flight: reviewId });
  res.status(StatusCodes.OK).json({ review, count: review.length });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getCurrentUserReviews,
  getSingleFlightReview,
};
