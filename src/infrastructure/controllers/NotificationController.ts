import express, { Request, Response } from 'express';
import { NotificationService } from "../../application/NotificationService";
import { NotificationRepository } from "../database/NotificationRepository";

const router = express.Router();
const repository = new NotificationRepository();
const service = new NotificationService(repository);

router.post('/notifications', async (req: Request, res: Response) => {
    const { userId, message, transactionId, transactionType } = req.body;
    const notification = await service.sendNotification(userId, message, transactionId, transactionType);
    res.status(201).json(notification);
});

router.get('/notifications/:userId', async (req: Request, res: Response) => {
    const notifications = await service.getNotifications(req.params.userId);
    res.json(notifications);
});

export default router;