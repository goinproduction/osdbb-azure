import 'reflect-metadata';
import 'dotenv/config';
import './src/configs/passport';
import { middlewares } from './src/middlewares';
import express from 'express';
import { establishDBConnection } from './src/configs';
import route from './src/routes';

establishDBConnection();

const app = express();
app.use(...middlewares);
route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
