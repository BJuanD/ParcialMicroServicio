import { createClient } from 'redis';
import { Notification } from "../../domain/Notification";

export class NotificationRepository {
    private client: ReturnType<typeof createClient>;

    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => console.error('Redis Client Error', err));
        this.client.connect();
    }

    async save(notification: Notification): Promise<Notification> {
        try {
            const key = `notification:${notification.id}`;
            await this.client.hSet(key, [
                'id', notification.id,
                'userId', notification.userId,
                'message', notification.message,
                'date', notification.date.toISOString(),
                'transactionId', notification.transactionId,
                'transactionType', notification.transactionType
            ]);
            return notification;
        } catch (error) {
            console.error('Error saving notification to Redis:', error);
            throw error;
        }
    }

    async findByUserId(userId: string): Promise<Notification[]> {
        try {
            const keys = await this.client.keys('notification:*');
            const notifications: Notification[] = [];

            for (const key of keys) {
                const notificationData = await this.client.hGetAll(key);
                if (notificationData.userId === userId) {
                    notifications.push(new Notification(
                        notificationData.id,
                        notificationData.userId,
                        notificationData.message,
                        new Date(notificationData.date),
                        notificationData.transactionId,
                        notificationData.transactionType
                    ));
                }
            }

            return notifications;
        } catch (error) {
            console.error('Error fetching notifications from Redis:', error);
            throw error;
        }
    }
}