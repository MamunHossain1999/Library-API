import express from "express";
import cors from "cors";
import morgan from "morgan";            
import { BookRoutes } from "./app/modules/book/book.route";
import { BorrowRoutes } from "./app/modules/borrow/borrow.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import { AuthRoutes } from "./app/modules/auth/auth.route";

const app = express();

app.use(morgan("dev"));             

app.use(cookieParser());

app.use(
  cors({
    origin: ["https://libray-rho.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Authentication Routes
app.use("/api/auth", AuthRoutes);

// Application Routes
app.use("/api/books", BookRoutes);
app.use("/api/borrow", BorrowRoutes);
app.use("/api/borrow/summary", BorrowRoutes);

app.use(globalErrorHandler);

export { app };
