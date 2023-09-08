import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

const updatePasswordSchema = z.object({
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
  passwordConfirmation: z.string(),
});

export const validateUpdatePasswordBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    updatePasswordSchema.parse(req.body);

    if (req.body.password !== req.body.passwordConfirmation) {
      res.status(400).json({
        message: 'Invalid request body',
        details: 'Passwords don\'t match',
      });
    }

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
