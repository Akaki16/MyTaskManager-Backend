require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const tasksRouter = require('./controllers/tasks');

// connect to the MongoDB database
mongoose.connect(config.DB_URI)
.then(res => {
    logger.info('Successfuly connected to the MongoDB database');
})
.catch(err => {
    logger.error('Cannot connect to the MongoDB database');
});

// middlewares
app.use(express.json());
app.use(cors());

// route middlewares
app.use('/api/tasks', tasksRouter);

// export app to use in (index.js)
module.exports = app;