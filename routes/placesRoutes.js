const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createPlace,
  getAllPlaces,
  getSinglePlace,
  updatePlace,
  deletePlace,
} = require('../controllers/placesController');

const { getPlaceFlight } = require('../controllers/flightsController');

// const { getSingleFlightReview } = require('../controllers/reviewController');

router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')], createPlace)
  .get(getAllPlaces);

router
  .route('/:id')
  .get(getSinglePlace)
  .patch([authenticateUser, authorizePermissions('admin')], updatePlace)
  .delete([authenticateUser, authorizePermissions('admin')], deletePlace);

router.route('/:id/flight').get(getPlaceFlight);
// router.route('/:id/reviews').get(getSingleFlightReview);

module.exports = router;
