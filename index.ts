import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { rateLimit } from "express-rate-limit";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const limiter = rateLimit({
  max: 3,
  windowMs: 1000,
  message: "Too many request from this IP"
});

app.use(limiter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the GeeksforGeeks express server"
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});