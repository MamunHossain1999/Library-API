"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = require("./app/modules/book/book.route");
const borrow_route_1 = require("./app/modules/borrow/borrow.route");
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: "https://libray-rho.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
// Routes
app.use("/api/books", book_route_1.BookRoutes);
app.use("/api/borrow", borrow_route_1.BorrowRoutes);
app.use("/api/borrow/summary", borrow_route_1.BorrowRoutes);
app.use(globalErrorHandler_1.globalErrorHandler);
