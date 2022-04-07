// model object that is responsible for manipulating data in/to MongoDB 
'use strict';

const dbo = require("../db/dbConn");
const logger = require('../utils/logger');

const add = async (document) => {
    const dbConnect = dbo.getDb();

    return dbConnect
        .collection("logs")
        .insertOne(document).then((result) => {
            logger.info(`Added a new match with id ${result.insertedId}`);
            return true
        }).catch((erro) => {
            logger.error('Error inserting log!', erro)
            return false
        })
};

module.exports = { add };