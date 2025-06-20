import { Types } from 'mongoose';

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBorrowMethods {
 
}

export interface IBorrowStatics {
  handleBorrow(bookId: string, quantity: number): Promise<void>;
}
    