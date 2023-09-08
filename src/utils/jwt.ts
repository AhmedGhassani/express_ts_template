import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY || '';

export const generateToken = async (userID: string) => {
  try {
    const payload = { id: userID };
    const token = jwt.sign(payload, secretKey);

    await prisma.jwtToken.create({ data: { token: token, userId: userID } });

    return token;
  } catch (error) {
    throw 'Error Signing User ID';
  }
};

export const deleteToken = async (userID: string) => {
  try {
    await prisma.jwtToken.deleteMany({
      where: {
        userId: userID,
      },
    });
  } catch (error) {
    throw 'Error while deleting JWT token';
  }
};
