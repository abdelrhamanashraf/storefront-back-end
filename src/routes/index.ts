import express, { Request, Response, Router } from 'express';
import userEP from './handlers/usershandler';
import productEP from './handlers/producthandler';
import orderEP from './handlers/orderhandler';

const routes: Router = express.Router();

routes.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'routing',
  });
});

routes.use('/users', userEP);
routes.use('/product', productEP);
routes.use('/orders', orderEP);

//
export default routes;
