const { StatusCodes } = require('http-status-codes');
const BookFlight = require('../models/bookFlight');
const Seat = require('../models/Seats');

const CustomError = require('../errors');

const createBookFlight = async (req, res) => {
  req.body.user = req.user.userId;

  if (req.body.flightClass === 'Economy') {
    req.body.subtotal;
  } else if (req.body.flightClass === 'Business') {
    req.body.subtotal += 300;
  } else {
    req.body.subtotal += 900;
  }

  req.body.total = req.body.tax + req.body.subtotal;

  const checkSeat = await BookFlight.findOne({ seat_no: req.body.seat_no });
  if (checkSeat) {
    throw new CustomError.BadRequestError(
      `Please Choose another seat, ${req.body.seat_no} is already booked`
    );
  }

  if (req.body.billed === false) {
    throw new CustomError.BadRequestError(
      `Please Do the payment before proceeding`
    );
  }

  const flight = await BookFlight.create(req.body);
  res.status(StatusCodes.CREATED).json({ flight });
};

const getAllBookedFlights = async (req, res) => {
  const flights = await BookFlight.find({});
  res.status(StatusCodes.OK).json({ flights, count: flights.length });
};

const getCurrentUserBookedFlights = async (req, res) => {
  const flights = await BookFlight.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ flights, count: flights.length });
};

const getSingleBookedFlight = async (req, res) => {
  const { id: flightId } = req.params;
  const flight = await BookFlight.findOne({ _id: flightId });

  if (!flight) {
    throw new CustomError.NotFoundError(`No flight with id : ${flightId}`);
  }

  res.status(StatusCodes.OK).json({ flight });
};

const updateBookedFlight = async (req, res) => {
  const { id: flightId } = req.params;
  const flight = await BookFlight.findOneAndUpdate(
    { _id: flightId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!flight) {
    throw new CustomError.NotFoundError(`No flight with id : ${flightId}`);
  }

  res.status(StatusCodes.OK).json({ flight });
};

const deleteBookedFlight = async (req, res) => {
  const { id: flightId } = req.params;
  const flight = await BookFlight.findOne({ _id: flightId });

  if (!flight) {
    throw new CustomError.NotFoundError(`No flight with id : ${flightId}`);
  }

  await flight.remove();
  res.status(StatusCodes.OK).json({ msg: 'flight deleted successfully' });
};

module.exports = {
  createBookFlight,
  getAllBookedFlights,
  getSingleBookedFlight,
  updateBookedFlight,
  deleteBookedFlight,
  getCurrentUserBookedFlights,
};
