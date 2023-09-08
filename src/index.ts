import express, { Request, Response, json } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('App is Healthy');
});

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
  console.log(`Health Check: http://localhost:${port}`);
});
