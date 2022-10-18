const { StatusCodes } = require('http-status-codes');
const Flight = require('../models/Flight');

const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;

const getImage = async (image) => {
  const { secure_url } = await cloudinary.uploader.upload(image, {
    use_filename: true,
    folder: 'flights-booking',
  });
  return secure_url;
};

const createFlight = async (req, res) => {
  const result = await getImage(req.files.image.tempFilePath);

  req.body.user = req.user.userId;
  req.body.image = result;
  const flight = await Flight.create(req.body);
  res.status(StatusCodes.CREATED).json({ flight });
};

const getAllFlights = async (req, res) => {
  const flights = await Flight.find({});
  res.status(StatusCodes.OK).json({ flights, count: flights.length });
};

const getSingleFlight = async (req, res) => {
  const { id: flightId } = req.params;
  const flight = await Flight.findOne({ _id: flightId })
    .populate('reviews')
    .populate('departureFlights');

  if (!flight) {
    throw new CustomError.NotFoundError(`No flight with id : ${flightId}`);
  }

  res.status(StatusCodes.OK).json({ flight });
};

const updateFlight = async (req, res) => {
  const { id: flightId } = req.params;
  const flight = await Flight.findOneAndUpdate({ _id: flightId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!flight) {
    throw new CustomError.NotFoundError(`No flight with id : ${flightId}`);
  }

  res.status(StatusCodes.OK).json({ flight });
};

const deleteFlight = async (req, res) => {
  const { id: flightId } = req.params;
  const flight = await Flight.findOne({ _id: flightId });

  if (!flight) {
    throw new CustomError.NotFoundError(`No flight with id : ${flightId}`);
  }

  await flight.remove();
  res.status(StatusCodes.OK).json({ msg: 'flight deleted successfully' });
};

module.exports = {
  createFlight,
  getAllFlights,
  getSingleFlight,
  updateFlight,
  deleteFlight,
};
