// this is the Consumer that consumes log data from the rabbitMQ and store them on MongoDB 
'use strict';

const logger = require('../utils/logger');
const rabbitMq = require('./rabbitmq');

const consumeQueryDistanceLog = async () => {
    // You can use an exchange/key fron config/default.json
    const exchange = 'log';
    const key = 'distance.query';  

    return rabbitMq.consumeMessage(exchange, `${key}`);
}

module.exports = {consumeQueryDistanceLog};
