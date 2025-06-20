import mongoose, { Schema, Model } from 'mongoose';

import { IBorrow, IBorrowStatics } from './borrow.interface';
import { Book } from '../book/book.model';

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

// static method to update book copies & availability
borrowSchema.statics.handleBorrow = async function (
  bookId: string,
  quantity: number
) {
  const book = await Book.findById(bookId);
  if (!book) throw new Error('Book not found');
  if (book.copies < quantity) throw new Error('Not enough copies available');

  book.copies -= quantity;
  book.available = book.copies > 0;
  await book.save();
};

// Mongoose model with statics type
export const Borrow = mongoose.model<IBorrow, Model<IBorrow> & IBorrowStatics>('Borrow', borrowSchema);
