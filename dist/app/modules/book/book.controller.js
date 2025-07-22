"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_model_1 = require("./book.model");
exports.BookController = {
    // Create a new book
    createBook: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newBook = yield book_model_1.Book.create(req.body);
            res.status(201).json({
                success: true,
                message: "Book created successfully",
                data: newBook,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    // Get all books with optional filtering and sorting
    getAllBooks: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { filter, sortBy = "createdAt", sort = "desc", limit = "30", } = req.query;
            const query = {};
            if (filter)
                query.genre = filter;
            const books = yield book_model_1.Book.find(query)
                .sort({ [sortBy]: sort === "desc" ? -1 : 1 })
                .limit(Number(limit));
            res.json({
                success: true,
                message: "Books retrieved successfully",
                data: books,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    // Get a book by ID
    getBookById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const book = yield book_model_1.Book.findById(req.params.bookId);
            //   error handling for book not found
            if (!book) {
                throw new Error("Book not found");
            }
            res.json({
                success: true,
                message: "Book retrieved successfully",
                data: book,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    // Update a book by ID
    updateBook: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
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
        }
        catch (error) {
            next(error);
        }
    }),
    // Delete a book by ID
    deleteBook: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleted = yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
            if (!deleted) {
                throw new Error("Book not found");
            }
            res.json({
                success: true,
                message: "Book deleted successfully",
                data: null,
            });
        }
        catch (error) {
            next(error);
        }
    }),
};
