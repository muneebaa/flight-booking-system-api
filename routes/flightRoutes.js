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

const {
  getAllFlightDeptFLights,
} = require('../controllers/departureFlightController');

const { getSingleFlightReview } = require('../controllers/reviewController');

router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')], createFlight)
  .get(getAllFlights);

router
  .route('/:id')
  .get(getSingleFlight)
  .patch([authenticateUser, authorizePermissions('admin')], updateFlight)
  .delete([authenticateUser, authorizePermissions('admin')], deleteFlight);

router.route('/:id/departureFlights').get(getAllFlightDeptFLights);
router.route('/:id/reviews').get(getSingleFlightReview);

module.exports = router;
