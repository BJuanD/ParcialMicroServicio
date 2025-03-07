import express from 'express';
import notificationRouter from './infrastructure/controllers/NotificationController'

const app = express();
app.use(express.json());

app.use('/api', notificationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});