const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createDepartureFlight,
  getAllDepartureFlights,
  getSingleDepartureFlight,
  updateDepartureFlight,
  deleteDepartureFlight,
} = require('../controllers/departureFlightController');

router
  .route('/')
  .post(
    [authenticateUser, authorizePermissions('admin')],
    createDepartureFlight
  )
  .get(getAllDepartureFlights);

router
  .route('/:id')
  .get(authenticateUser, getSingleDepartureFlight)
  .patch(
    [authenticateUser, authorizePermissions('admin')],
    updateDepartureFlight
  )
  .delete(
    [authenticateUser, authorizePermissions('admin')],
    deleteDepartureFlight
  );

module.exports = router;
