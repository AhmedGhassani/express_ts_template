import express, { Request, Response, NextFunction, json } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('App is Healthy');
});

// Add Routes Here

app.use('/users', userRouter);

// Don't Add Routes Below

// Handle 404 Errors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: `Path ${req.url} Not Found` });
});

// Handle Uncaught Internal Server Errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
  console.log(`Health Check: http://localhost:${port}`);
});
