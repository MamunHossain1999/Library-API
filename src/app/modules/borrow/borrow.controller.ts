import { Book } from './../book/book.model';
import { Request, Response } from 'express';
import { Borrow } from './borrow.model';

export const BorrowController = {
  borrowBook: async (req: Request, res: Response) => {
    try {
      const { book, quantity, dueDate } = req.body;

      // Step 1: handle stock and availability
      await Borrow.handleBorrow(book, quantity);

      // Step 2: create borrow record
      const borrow = await Borrow.create({ book, quantity, dueDate });

      res.status(201).json({
        success: true,
        message: 'Book borrowed successfully',
        data: borrow,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Borrow failed',
        error: error.message || error,
      });
    }
  },

  borrowSummary: async (_req: Request, res: Response) => {
    try {
      const summary = await Borrow.aggregate([
        {
          $group: {
            _id: '$book',
            totalQuantity: { $sum: '$quantity' },
          },
        },
        {
          $lookup: {
            from: 'books',
            localField: '_id',
            foreignField: '_id',
            as: 'bookInfo',
          },
        },
        { $unwind: '$bookInfo' },
        {
          $project: {
            _id: 0,
            book: {
              title: '$bookInfo.title',
              isbn: '$bookInfo.isbn',
            },
            totalQuantity: 1,
          },
        },
      ]);

      res.status(200).json({
        success: true,
        message: 'Borrowed books summary retrieved successfully',
        data: summary,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to get summary',
        error: error.message || error,
      });
    }
  },
};
