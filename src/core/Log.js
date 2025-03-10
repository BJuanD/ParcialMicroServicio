class Log {
    constructor(id, servicio, nivel, mensaje, timestamp) {
        this.id = id;
        this.servicio = servicio;
        this.nivel = nivel;
        this.mensaje = mensaje;
        this.timestamp = timestamp || new Date();
    }
}

module.exports = Log;
