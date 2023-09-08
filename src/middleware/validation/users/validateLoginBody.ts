import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const validateLoginBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    loginSchema.parse(req.body);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map(
        (err) => `${err.path.join(' -> ')} : ${err.message}`,
      );

      res.status(400).json({
        message: 'Invalid request body',
        details: errors,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
        details: error,
      });
    }
  }
};
