const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const moment = require('moment');
const numeral = require('numeral');
const favicon = require('serve-favicon');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const app = express();

// Startup the database
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log(`Connected to ${process.env.MONGODB}`))
    .catch(err =>
        console.log(
            'Cannot find',
            process.env.MONGODB,
            '\nDatabase connection error:',
            err.errmsg,
            '\n',
            err
        )
    );

// Use handlebars at templating engine
numeral.defaultFormat('$0,0.00');
app.engine(
    'hbs',
    exphbs({
        defaultLayout: 'main',
        extname: 'hbs',
        helpers: {
            formatDate: date => (date ? moment(date).format('DD/MM/YY') : ''),
            formatStrike: amt => (amt ? numeral(amt).format() : ''),
            formatCash: amt => numeral(amt).format(''),
            formatNums: qty => numeral(qty).format('0,0'),
            formatJson: json => JSON.stringify(json).replace(/ /g, '_'),
            test: (error, trade) =>
                trade.errors.includes(error)
                    ? new Handlebars.SafeString(
                          `<strong class="w3-red">${
                              trade['trade'][error]
                          }</strong>`
                      )
                    : trade['trade'][error],
            closedExist: trades => trades.length,
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Config express
app.use(favicon(path.join(__dirname, '../public/img', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev')); // Logger
app.use(fileupload());
app.use(bodyParser.urlencoded({ limit: '1mb' }));
app.use(bodyParser.json());

app.use('/api', apiRoutes); // API router
app.use(webRoutes);

// This last route is a catchall to capture not found requests
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Add error middleware to handle errors consistently
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;
