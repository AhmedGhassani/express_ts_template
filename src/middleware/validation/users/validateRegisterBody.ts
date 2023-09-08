import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z
    .string()
    .min(8)
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must include at least one uppercase character',
    })
    // eslint-disable-next-line no-useless-escape
    .refine((password) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password), {
      message: 'Password must include at least one special character',
    }),
});

export const validateRegisterBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    userSchema.parse(req.body);

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
