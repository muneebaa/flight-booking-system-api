const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createSeatsFlight,
  getAllSeats,
  getSingleSeat,
  updateSeat,
  deleteSeat,
} = require('../controllers/seatsController');

router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')], createSeatsFlight)
  .get(getAllSeats);

router
  .route('/:id')
  .get([authenticateUser, authorizePermissions('admin')], getSingleSeat)
  .patch([authenticateUser, authorizePermissions('admin')], updateSeat)
  .delete([authenticateUser, authorizePermissions('admin')], deleteSeat);

module.exports = router;

module.exports = router;
