const { StatusCodes } = require('http-status-codes');
const Places = require('../models/Places');

const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;

const getImage = async (image) => {
  const { secure_url } = await cloudinary.uploader.upload(image, {
    use_filename: true,
    folder: 'flights-booking',
  });
  return secure_url;
};

const createPlace = async (req, res) => {
  const result = await getImage(req.files.image.tempFilePath);

  req.body.user = req.user.userId;
  req.body.image = result;
  const places = await Places.create(req.body);
  res.status(StatusCodes.CREATED).json({ places });
};

const getAllPlaces = async (req, res) => {
  const places = await Places.find({});
  res.status(StatusCodes.OK).json({ places, count: places.length });
};

const getSinglePlace = async (req, res) => {
  const { id: placeId } = req.params;
  const places = await Places.findOne({ _id: placeId });
  // .populate('reviews')
  // .populate('departureFligdhts');

  if (!places) {
    throw new CustomError.NotFoundError(`No places with id : ${placeId}`);
  }

  res.status(StatusCodes.OK).json({ places });
};

const updatePlace = async (req, res) => {
  const { id: placeId } = req.params;
  const places = await Places.findOneAndUpdate({ _id: placeId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!places) {
    throw new CustomError.NotFoundError(`No places with id : ${placeId}`);
  }

  res.status(StatusCodes.OK).json({ places });
};

const deletePlace = async (req, res) => {
  const { id: placeId } = req.params;
  const places = await Places.findOne({ _id: placeId });

  if (!places) {
    throw new CustomError.NotFoundError(`No places with id : ${placeId}`);
  }

  await places.remove();
  res.status(StatusCodes.OK).json({ msg: 'places deleted successfully' });
};

module.exports = {
  createPlace,
  getAllPlaces,
  getSinglePlace,
  updatePlace,
  deletePlace,
};
