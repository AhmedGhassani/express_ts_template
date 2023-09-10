import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {
  validateRegisterBody,
  validateLoginBody,
  validateUpdatePasswordBody,
} from '../middleware/validation/users';
import { Prisma } from '@prisma/client';
import { generateToken, deleteToken } from '../utils';
import { verifyToken } from '../middleware/auth/verifyToken';
import prisma from '../db/prisma';

const userRouter = express.Router();

userRouter.post(
  '/register',
  validateRegisterBody,
  async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: hashedPassword,
        },
      });

      const token = await generateToken(user.id);

      res
        .status(201)
        .json({ message: 'Registered successfully', data: { token } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return res.status(400).json({ message: 'Email is already in use' });
      } else {
        res.status(500).json({ message: 'Oops! Something went wrong', error });
      }
    }
  },
);

userRouter.post(
  '/login',
  validateLoginBody,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = await generateToken(user.id);

      res.status(200).json({ message: 'Login successful', data: { token } });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Oops! Something went wrong' });
    }
  },
);

userRouter.post(
  '/update-password',
  verifyToken,
  validateUpdatePasswordBody,
  async (req: Request, res: Response) => {
    try {
      const { password, user } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      await deleteToken(user.id);
      const token = await generateToken(user.id);

      res
        .status(200)
        .json({ message: 'Password Updated Successfully', data: { token } });
    } catch (error) {
      res.status(500).json({
        message: 'Oops! Something went wrong',
        error,
      });
    }
  },
);

export default userRouter;
