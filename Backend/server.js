require('dotenv').config({ path: '../.env' });

const express = require('express');
const path = require('path');
// const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
// const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');



// Load env vars
// dotenv.config({ path: './config/config.env' });
// require('dotenv').config();

 
// Connect to database
connectDB();
console.log('MongoDB connected'.cyan.bold);

// Route files
const admin = require('./routes/adminRoute');
const agents = require('./routes/agentRoute');
const lists = require('./routes/listRoute');

const mongoSanitize = require('express-mongo-sanitize');

// Instead of global sanitization:


const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Sanitize data
// app.use(mongoSanitize());

// app.use(
//   mongoSanitize({
//     allowDots: true,
//     replaceWith: '_',
//     dryRun: false,
//   })
// );
app.use((req, res, next) => {
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body);
  }
  next();
});




// Set security headers
app.use(helmet());

// Prevent XSS attacks
// app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/routes/adminRoute',admin);
// app.use('/api/v1/auth', admin);
// app.use('/api/v1/agents', agents);
// app.use('/api/v1/lists', lists);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});