import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err?.errors?.[0]?.message || 'Validation Error',
      });
    }
  };
};

export default validateRequest;
