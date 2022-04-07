# microServiceBaseConsumer
This is dummy but extended example of a NodeJS microservice that can be used as a base for creating new one, more reliable and complete. 
It was created as resulting from my study about microservices which I did from my short experience creating NodeJS APIs and reading some good tutorials listed bellow.

I hope it can help you learn about microservice and enhance this base.

*Considere the [microServiceBaseProducer](https://github.com/rafaelcastellar/microServiceBaseProducer) running in other terminal for a complete example.*


### How it works
This microservices acts like a messaging consumer

### Folder structure
* *config*: contains the configuration files with the parameters used by the microservice (rename de default.json.template to default.json and fullfill it with your own parmeters)
* *db*: contains the MongoDB connection object 
* *models*: contains all the models responsible for manipulating the data (documents) from/to MongoDB 
* *services*: contains serives that interacts with the external world and other tools (RabbitMQ, fi) 
* *utils*: contains other general purpose utilities like logger object 

### How to Run
1. have a MongoDB instance running
2. have a RabbitMQ instance running
3. rename config/defaul.json.template to config/default.json
4. fullfill the config/defaul.json with you own parameters
5. install the packages
`npm i`
6. run `npm start`
7. have a [microServiceBaseProducer](https://github.com/rafaelcastellar/microServiceBaseProducer) running and access its endpoints :-)


### External sources
I'm thankfull for the these guys who helped me to learn about NodeJS microservices, MongoDB and RabbitMQ: 

* https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial
* https://github.com/mongodb-developer/mongodb-express-rest-api-example/
* https://github.com/cverdier/rabbitmq-node-producer
* https://www.rabbitmq.com/getstarted.html
* https://sematext.com/blog/node-js-logging/
