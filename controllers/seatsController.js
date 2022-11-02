const { StatusCodes } = require('http-status-codes');
const Seats = require('../models/Seats');
const Flights = require('../models/Flights');

const CustomError = require('../errors');

const createSeatsFlight = async (req, res) => {
  req.body.user = req.user.userId;
  const checkFlight = await Flights.findOne({
    _id: req.body.flight,
  });

  if (!checkFlight) {
    throw new CustomError.NotFoundError(
      `No flight with id : ${req.body.flight}`
    );
  }

  const alreadySubmitted = await Seats.findOne({
    number: req.body.number,
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      `The seat number ${req.body.number} is already created`
    );
  }

  const seats = await Seats.create(req.body);
  console.log(req.body);

  res.status(StatusCodes.CREATED).json({ seats });
};

const getAllSeats = async (req, res) => {
  const seats = await Seats.find({});
  res.status(StatusCodes.OK).json({ seats, count: seats.length });
};

const getSingleSeat = async (req, res) => {
  const { id: seatId } = req.params;
  const seat = await Seats.findOne({
    _id: seatId,
  });

  if (!seat) {
    throw new CustomError.NotFoundError(`No seat with id : ${seat}`);
  }

  res.status(StatusCodes.OK).json({ seat });
};

const updateSeat = async (req, res) => {
  const { id: seatId } = req.params;
  const seat = await Seats.findOneAndUpdate({ _id: seatId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!seat) {
    throw new CustomError.NotFoundError(`No seat with id : ${seat}`);
  }

  res.status(StatusCodes.OK).json({ seat });
};

const deleteSeat = async (req, res) => {
  const { id: seatId } = req.params;
  const seat = await Seats.findOne({
    _id: seatId,
  });

  if (!seat) {
    throw new CustomError.NotFoundError(`No seat with id : ${seat}`);
  }

  await Seats.remove();
  res.status(StatusCodes.OK).json({ msg: 'seat deleted successfully' });
};

module.exports = {
  createSeatsFlight,
  getAllSeats,
  getSingleSeat,
  updateSeat,
  deleteSeat,
};
