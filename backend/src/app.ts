import cors from 'cors';
import express from 'express';
import { apiRouter } from './routes';
import { notFoundHandler } from './middleware/notFoundHandler';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
