const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createFlight,
  getAllFlights,
  getSingleFlight,
  updateFlight,
  deleteFlight,
} = require('../controllers/flightsController');

const { getFlightSeats } = require('../controllers/seatsController');

router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')], createFlight)
  .get(getAllFlights);

router
  .route('/:id')
  .get(authenticateUser, getSingleFlight)
  .patch([authenticateUser, authorizePermissions('admin')], updateFlight)
  .delete([authenticateUser, authorizePermissions('admin')], deleteFlight);

router.route('/:id/seats').get(getFlightSeats);

module.exports = router;
