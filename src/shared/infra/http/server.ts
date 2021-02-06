import 'reflect-metadata';
import cors from 'cors';

import express, { Request, Response, NextFunction} from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from '@config/upload';

import '@shared/infra/typeorm';
import '@shared/container';

import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request:Request, response:Response, _:NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: `500 Internal Server error ${err.message}`,
  });
});

<<<<<<< HEAD
app.listen(process.env.API_PORT, ()=> {
  console.log(`🚀 Server Started on port ${process.env.API_PORT}!`)
=======
app.listen(process.env.APP_PORT, ()=> {
  console.log(`🚀 Server Started on port ${process.env.APP_PORT}!`)
>>>>>>> 131d4ab427c9447db1b55f4cc7e2a1af07a3e8db
});
