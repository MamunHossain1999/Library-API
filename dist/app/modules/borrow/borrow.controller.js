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
exports.BorrowController = void 0;
const borrow_model_1 = require("./borrow.model");
exports.BorrowController = {
    borrowBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { book, quantity, dueDate } = req.body;
            // Step 1: handle stock and availability
            yield borrow_model_1.Borrow.handleBorrow(book, quantity);
            // Step 2: create borrow record
            const borrow = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
            res.status(201).json({
                success: true,
                message: 'Book borrowed successfully',
                data: borrow,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Borrow failed',
                error: error.message || error,
            });
        }
    }),
    borrowSummary: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const summary = yield borrow_model_1.Borrow.aggregate([
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to get summary',
                error: error.message || error,
            });
        }
    }),
};
