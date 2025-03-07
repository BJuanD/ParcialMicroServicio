import { Notification } from "../domain/Notification";
import { NotificationRepository } from "../infrastructure/database/NotificationRepository";

export class NotificationService {
    constructor(private repository: NotificationRepository) {}

    async sendNotification(userId: string, message: string, transactionId: string, transactionType: string): Promise<Notification> {
        const notification = new Notification(
            Math.random().toString(36).substr(2, 9), // Genera un ID aleatorio
            userId,
            message,
            new Date(), // Fecha actual
            transactionId,
            transactionType
        );
        return this.repository.save(notification);
    }

    async getNotifications(userId: string): Promise<Notification[]> {
        return this.repository.findByUserId(userId);
    }
}