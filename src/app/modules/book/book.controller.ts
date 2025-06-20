import { Request, Response, NextFunction } from "express";
import { Book } from "./book.model";

export const BookController = {
  // Create a new book
  createBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBook = await Book.create(req.body);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: newBook,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all books with optional filtering and sorting
  getAllBooks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        filter,
        sortBy = "createdAt",
        sort = "desc",
        limit = "10",
      } = req.query;

      const query: any = {};
      if (filter) query.genre = filter;

      const books = await Book.find(query)
        .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
        .limit(Number(limit));

      res.json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get a book by ID
  getBookById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.findById(req.params.bookId);

      //   error handling for book not found
      if (!book) {
        throw new Error("Book not found");
      }

      res.json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update a book by ID
  updateBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
      });
      //   error handling for book not found
      if (!book) {
        throw new Error("Book not found");
      }

      res.json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete a book by ID
  deleteBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await Book.findByIdAndDelete(req.params.bookId);
      if (!deleted) {
        throw new Error("Book not found");
      }

      res.json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
