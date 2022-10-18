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
const flightRouter = require('./routes/flightRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const departureFlightRouter = require('./routes/departureFlightRoutes');
const bookFlightRouter = require('./routes/bookFlight');

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());

app.get('/', (req, res) => {
  console.log(req.cookies);
  res.send('e-commerce api');
});

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies);
  res.send('e-commerce api');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/flights', flightRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/departureFlights', departureFlightRouter);
app.use('/api/v1/bookflight', bookFlightRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  await connectDB(process.env.MONGO_URL);
  try {
    app.listen(port, console.log(`Server is listning on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
