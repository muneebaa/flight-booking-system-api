const { StatusCodes } = require('http-status-codes');
const Places = require('../models/Places');
const Flights = require('../models/Flights');

const CustomError = require('../errors');

const createFlight = async (req, res) => {
  req.body.user = req.user.userId;
  const checkFlight = await Places.findOne({
    _id: req.body.place,
  });

  const checkCity = await Places.findOne({
    city: req.body.origin,
  });

  if (!checkCity) {
    throw new CustomError.NotFoundError(` ${req.body.origin} is not available`);
  }

  if (!checkFlight) {
    throw new CustomError.NotFoundError(`No place with id : ${req.body.place}`);
  }

  if (req.body.origin === checkFlight.city) {
    throw new CustomError.NotFoundError(
      `origin and destination can not be same`
    );
  }

  req.body.destination = checkFlight.city;
  const flight = await Flights.create(req.body);

  res.status(StatusCodes.CREATED).json({ flight });
};

const getAllFlights = async (req, res) => {
  const flight = await Flights.find({});
  res.status(StatusCodes.OK).json({ flight, count: flight.length });
};

const getSingleFlight = async (req, res) => {
  const { id: flightId } = req.params;
  const flight = await Flights.findOne({
    _id: flightId,
  });

  if (!flight) {
    throw new CustomError.NotFoundError(`No flight with id : ${flight}`);
  }

  res.status(StatusCodes.OK).json({ flight });
};

const updateFlight = async (req, res) => {
  const { id: flightId } = req.params;
  const flight = await Flights.findOneAndUpdate({ _id: flightId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!flight) {
    throw new CustomError.NotFoundError(`No flight with id : ${flight}`);
  }

  res.status(StatusCodes.OK).json({ flight });
};

const deleteFlight = async (req, res) => {
  const { id: flightId } = req.params;
  const flight = await Flights.findOne({ _id: flightId });

  if (!flight) {
    throw new CustomError.NotFoundError(`No flight with id : ${flight}`);
  }

  await flight.remove();
  res.status(StatusCodes.OK).json({ msg: 'flight deleted successfully' });
};

const getPlaceFlight = async (req, res) => {
  const { id: placeId } = req.params;
  const flights = await Flights.find({ place: placeId });
  res.status(StatusCodes.OK).json({ flights, count: flights.length });
};

module.exports = {
  createFlight,
  getAllFlights,
  getSingleFlight,
  updateFlight,
  deleteFlight,
  getPlaceFlight,
};
