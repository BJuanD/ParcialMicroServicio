export class Notification {
    constructor(
        public id: string,
        public userId: string,
        public message: string,
        public date: Date,
        public transactionId: string, // ID de la transacción
        public transactionType: string // Tipo de transacción
    ) {}
}