import express from "express";
import cors from "cors";
import { BookRoutes } from "./app/modules/book/book.route";
import { BorrowRoutes } from "./app/modules/borrow/borrow.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/books", BookRoutes);
app.use("/api/borrow", BorrowRoutes);


app.use(globalErrorHandler);
export { app };
