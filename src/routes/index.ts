import authRouter from './auth.route';
import { Router } from 'express';

const route = (app: Router) => {
    app.use('/auth', authRouter);
};

export default route;
