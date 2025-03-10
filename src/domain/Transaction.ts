export class Transaction {
    constructor(
      public id: string,
      public accountId: string,
      public type: string, 
      public amount: number,
      public date: Date,
    ) {}
  }