const amqp = require('amqplib');
const MessageQueue = require('../ports/MessageQueue');

class RabbitMQAdapter extends MessageQueue {
    constructor() {
        super();
        this.channel = null;
        this.init();
    }

    async init() {
        try {
            const conn = await amqp.connect(process.env.RABBITMQ_URL);
            this.channel = await conn.createChannel();
            await this.channel.assertQueue('logs');
            console.log("✅ Conectado a RabbitMQ");
        } catch (error) {
            console.error("❌ Error conectando a RabbitMQ:", error);
        }
    }

    async publicar(log) {
        if (this.channel) {
            this.channel.sendToQueue('logs', Buffer.from(JSON.stringify(log)));
        }
    }
}

module.exports = RabbitMQAdapter;
