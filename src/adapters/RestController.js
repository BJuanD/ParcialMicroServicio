const express = require('express');

class RestController {
    constructor(logService) {
        this.logService = logService;
        this.router = express.Router();
        this.router.post('/logs', this.guardarLog.bind(this));
        this.router.get('/logs', this.obtenerLogs.bind(this));
    }

    async guardarLog(req, res) {
        try {
            const { servicio, nivel, mensaje } = req.body;
            await this.logService.guardarLog({ servicio, nivel, mensaje });
            res.status(201).send({ message: "Log guardado correctamente" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    async obtenerLogs(req, res) {
        try {
            const logs = await this.logService.obtenerLogs();
            res.send(logs);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = RestController;
