require('dotenv').config();
require('express-async-errors');

//express
const express = require('express');
const app = express();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET,
});

//rest pacakeges
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

//database
const connectDB = require('./db/connect');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const placesRouter = require('./routes/placesRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const flightsRouter = require('./routes/flightsRoutes');
const bookFlightRouter = require('./routes/bookFlight');
const seatRouter = require('./routes/seatsRoute');

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 60,
//   })
// );
app.use(helmet()); // for security reasons for our headers
app.use(xss()); // converts special charfacters such as < , > ,
app.use(mongoSanitize());
//  |
//  ^
// By default, $ and . characters are removed completely from user-supplied input in the following places:
// - req.body
// - req.params
// - req.headers
// - req.query

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/places', placesRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/flights', flightsRouter);
app.use('/api/v1/bookflight', bookFlightRouter);
app.use('/api/v1/flightseats', seatRouter);

app.use(notFoundMiddleware);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  await connectDB(process.env.MONGO_URL);
  try {
    app.listen(port, console.log(`Server is listning on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
