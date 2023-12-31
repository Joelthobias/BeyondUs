const express = require("express");
const morgan = require('morgan');
const app = express();
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser')
const Handlebars = require('handlebars')

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controllers/errorController');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Security - HTTPS header
app.use(helmet());

const viewRouter=require('./routes/viewRoutes');
const departmentRouter = require('./routes/departmentRoutes');
const employeeRouter = require('./routes/employeeRoutes');


// Serving static files
app.use(express.static(`${__dirname}/public`));

// Logging Routes
app.use(morgan('dev'));

// Body Parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

// Data sanitation against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent Parameter Pollution


app.use('/', viewRouter);
app.use('/api/v1/deaprtment', departmentRouter);
app.use('/api/v1/employees', employeeRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${
        req.originalUrl
    } on the current server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

