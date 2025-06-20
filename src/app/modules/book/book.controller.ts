import { Request, Response } from "express";
import { Book } from "./book.model";

export const BookController = {
  // Create a new book
  createBook: async (req: Request, res: Response) => {
    try {
      const newBook = await Book.create(req.body);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: newBook,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Error creating book", error });
    }
  },

  // Get all books with optional filtering and sorting
  getAllBooks: async (req: Request, res: Response) => {
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
      res
        .status(500)
        .json({ success: false, message: "Error retrieving books", error });
    }
  },

  // Get a book by ID
  getBookById: async (req: Request, res: Response) => {
    try {
      const book = await Book.findById(req.params.bookId);
      if (!book) {
         res
          .status(404)
          .json({ success: false, message: "Book not found" });
          return
      }

      res.json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error retrieving book", error });
    }
  },

  // Update a book by ID
  updateBook: async (req: Request, res: Response) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
      });
      if (!book)
      {
         res
          .status(404)
          .json({ success: false, message: "Book not found" });
         return
      }

      res.json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Error updating book", error });
    }
  },
  // Delete a book by ID
  deleteBook: async (req: Request, res: Response) => {
    try {
      await Book.findByIdAndDelete(req.params.bookId);
      res.json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error deleting book", error });
    }
  },
};
