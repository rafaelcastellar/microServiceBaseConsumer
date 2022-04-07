// setting logger up
const logger = require('./utils/logger')

//to use .env parameters
const config = require('config');

// get MongoDB driver connection
const dbo = require("./db/dbConn");

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
})

async function consume() {
  const consumer = require('./service/logConsumer')
  consumer.consumeQueryDistanceLog()
  logger.info(`Consumer running!`);
}

consume();