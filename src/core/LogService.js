class LogService {
    constructor(logRepository, messageQueue) {
        this.logRepository = logRepository;
        this.messageQueue = messageQueue;
    }

    async guardarLog(log) {
        await this.logRepository.guardar(log);
        await this.messageQueue.publicar(log);
    }

    async obtenerLogs() {
        return await this.logRepository.obtenerTodos();
    }
}

module.exports = LogService;
