"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const book_route_1 = require("./app/modules/book/book.route");
const borrow_route_1 = require("./app/modules/borrow/borrow.route");
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = require("./app/modules/auth/auth.route");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["https://libray-management-system-frontend.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
// Authentication Routes
app.use("/api/auth", auth_route_1.AuthRoutes);
// Application Routes
app.use("/api/books", book_route_1.BookRoutes);
app.use("/api/borrow", borrow_route_1.BorrowRoutes);
app.use("/api/borrow/summary", borrow_route_1.BorrowRoutes);
app.use(globalErrorHandler_1.globalErrorHandler);
