import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import prisma from '../../db/prisma';

const secretKey = process.env.JWT_SECRET_KEY || '';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.slice(7);

  try {
    if (!(await prisma.jwtToken.findFirst({ where: { token } }))) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    const decoded = jwt.verify(token, secretKey);

    req.body.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
