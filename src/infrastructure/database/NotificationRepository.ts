import { Client } from 'pg';
import { Notification } from "../../domain/Notification";

export class NotificationRepository {
    private client: Client;

    constructor() {
        this.client = new Client({
            user: 'postgres',       // Usuario de PostgreSQL
            host: 'localhost',         // Host de PostgreSQL
            database: 'notifications_db', // Nombre de la base de datos
            password: 'jdaniel9544', // Contraseña del usuario
            port: 5432,                // Puerto por defecto de PostgreSQL
        });
        this.client.connect();
    }

    async save(notification: Notification): Promise<Notification> {
        const query = 'INSERT INTO notifications(id, userId, message, date, transactionId, transactionType) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [notification.id, notification.userId, notification.message, notification.date, notification.transactionId, notification.transactionType];
        const res = await this.client.query(query, values);
        return res.rows[0];
    }

    async findByUserId(userId: string): Promise<Notification[]> {
        const query = 'SELECT * FROM notifications WHERE userId = $1';
        const res = await this.client.query(query, [userId]);
        return res.rows.map(row => new Notification(row.id, row.userId, row.message, row.date, row.transactionId, row.transactionType));
    }
}