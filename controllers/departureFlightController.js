const { StatusCodes } = require('http-status-codes');
const DepartureFlight = require('../models/departureFlight');
const Flight = require('../models/Flight');

const CustomError = require('../errors');

const createDepartureFlight = async (req, res) => {
  req.body.user = req.user.userId;
  const checkFlight = await Flight.findOne({
    _id: req.body.flight,
  });

  if (!checkFlight) {
    throw new CustomError.NotFoundError(
      `No flight with id : ${req.body.flight}`
    );
  }
  const departureFlight = await DepartureFlight.create(req.body);

  res.status(StatusCodes.CREATED).json({ departureFlight });
};

const getAllDepartureFlights = async (req, res) => {
  const departureFlight = await DepartureFlight.find({});
  res
    .status(StatusCodes.OK)
    .json({ departureFlight, count: departureFlight.length });
};

const getSingleDepartureFlight = async (req, res) => {
  const { id: departureFlightId } = req.params;
  const departureFlight = await DepartureFlight.findOne({
    _id: departureFlightId,
  });

  if (!departureFlight) {
    throw new CustomError.NotFoundError(
      `No flight with id : ${departureFlightId}`
    );
  }

  res.status(StatusCodes.OK).json({ departureFlight });
};

const updateDepartureFlight = async (req, res) => {
  const { id: departureFlightId } = req.params;
  const departureFlight = await DepartureFlight.findOneAndUpdate(
    { _id: departureFlightId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!departureFlight) {
    throw new CustomError.NotFoundError(
      `No flight with id : ${departureFlightId}`
    );
  }

  res.status(StatusCodes.OK).json({ departureFlight });
};

const deleteDepartureFlight = async (req, res) => {
  const { id: departureFlightId } = req.params;
  const departureFlight = await DepartureFlight.findOne({
    _id: departureFlightId,
  });

  if (!departureFlight) {
    throw new CustomError.NotFoundError(
      `No flight with id : ${departureFlightId}`
    );
  }

  await departureFlight.remove();
  res.status(StatusCodes.OK).json({ msg: 'flight deleted successfully' });
};

module.exports = {
  createDepartureFlight,
  getAllDepartureFlights,
  getSingleDepartureFlight,
  updateDepartureFlight,
  deleteDepartureFlight,
};
