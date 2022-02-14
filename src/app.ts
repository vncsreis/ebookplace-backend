import express from 'express';
import { router } from './routes';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv-safe';

export const app = express();

const env = dotenv.config();

const corsOptions: CorsOptions = {
  origin: env.required.CORSORIGIN,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', router);
