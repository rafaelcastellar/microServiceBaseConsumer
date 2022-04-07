// this is the object responsible manage the connection to rabbitMQ, sending and consuming messages to/from it.
'use strict';

const amqplib = require('amqplib');
const config = require('config');
const logger = require('../utils/logger');


const rabbitConfig = config.get('rabbitMQ')
const rabbitMQURL = `amqp://${rabbitConfig.user}:${rabbitConfig.pwd}@${rabbitConfig.host}:${rabbitConfig.port}`;

const client = amqplib.connect(rabbitMQURL, { keepAlive: true });
logger.info('Starting RabbitMQ connection');


const sendMessage = async (exchange, key, message) => {
    return client
        .then(connection => connection.createChannel())
        .then(channel => channel.assertExchange(exchange, 'topic', { durable: true })
            .then(() => channel.publish(exchange, key, Buffer.from(JSON.stringify(message)), { persistent: true }))
            .then(() => logger.debug('Sent message :', message))
            .then(() => channel.close())
        )
        .catch(logger.error);
}

const consumeMessage = async (exchange, key) => {
    const { add } = require('../models/log');

    return client
        .then(connection => connection.createChannel())
        .then(channel => channel.assertExchange(exchange, 'topic', { durable: true })
            .then(() => channel.assertQueue('', { exclusive: true })
                .then((queue) => {
                    logger.debug(`Queue name: ${queue.queue}`)
                    channel.bindQueue(queue.queue, exchange, key)
                        .then(() =>
                            channel.consume(queue.queue, function (msg) {
                                logger.debug(`[x] ${msg.fields.routingKey}:${msg.content.toString()}`);
                                add(JSON.parse(msg.content.toString()))
                            }, {
                                noAck: true
                            })
                        )
                })
            ))
        .catch((error) => logger.error('Error consuming message from MQ: ' + error));
}

module.exports = {
    sendMessage, consumeMessage
}