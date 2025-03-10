import express from 'express';
import accountRouter from './infrastructure/controllers/AccountController';
import transactionRouter from './infrastructure/controllers/TransactionController';

const app = express();
app.use(express.json());

app.use('/api', accountRouter);
app.use('/api', transactionRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});