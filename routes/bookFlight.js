const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createBookFlight,
  getAllBookedFlights,
  getCurrentUserBookedFlights,
  getSingleBookedFlight,
  updateBookedFlight,
  deleteBookedFlight,
} = require('../controllers/bookFlightController');

router
  .route('/')
  .post(authenticateUser, createBookFlight)
  .get([authenticateUser, authorizePermissions('admin')], getAllBookedFlights);

router.route('/booked').get(authenticateUser, getCurrentUserBookedFlights);

router
  .route('/:id')
  .get(authenticateUser, getSingleBookedFlight)
  .patch(authenticateUser, updateBookedFlight)
  .delete(authenticateUser, deleteBookedFlight);

module.exports = router;
