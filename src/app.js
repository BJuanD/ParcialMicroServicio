require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MySQLLogRepository = require('./adapters/MySQLLogRepository');
const RabbitMQAdapter = require('./adapters/RabbitMQAdapter');
const LogService = require('./core/LogService');
const RestController = require('./adapters/RestController');

const app = express();
app.use(bodyParser.json());

const logRepository = new MySQLLogRepository();
const messageQueue = new RabbitMQAdapter();
const logService = new LogService(logRepository, messageQueue);
const restController = new RestController(logService);

app.use(restController.router);

app.listen(3000, () => console.log("🚀 Servidor API REST corriendo en http://localhost:3000"));
