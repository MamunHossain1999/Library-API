import express from 'express';
import { BorrowController } from './borrow.controller';

const router = express.Router();

router.post('/', BorrowController.borrowBook);
router.get('/', BorrowController.borrowSummary);

export const BorrowRoutes = router;
