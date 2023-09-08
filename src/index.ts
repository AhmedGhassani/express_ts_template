import express, {Request, Response} from 'express';

import dotenv from 'dotenv';
dotenv.config();

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('App is Healthy')
})

app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
  console.log(`Health Check: http://localhost:${port}`)
})
