import { orders, orderModel, orders_products } from './../../models/order';
import express, { Request, Response, NextFunction, Router } from 'express';
import { tokenChecker } from './authhandler';

const orderEP: Router = express.Router();
const ordermodel = new orderModel();
//
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const o: orders = {
      users_id: req.body.users_id as number,
    };
    const creating = await ordermodel.create(o);
    res.json({
      message: `success`,
      data: { ...creating },
    });
  } catch (error) {
    next();
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const o: orders = {
      id: parseInt(req.params.id),
      users_id: req.body.users_id as number,
    };
    const updatting = await ordermodel.update(o);
    res.json({
      message: `success`,
      data: { ...updatting },
    });
  } catch (error) {
    next();
  }
};
const getAllOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gettingorders = await ordermodel.getAllorders();
    res.json({
      message: `success`,
      data: { ...gettingorders },
    });
  } catch (error) {
    next();
  }
};
const getAnOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as unknown as number;
    const gettingorder = await ordermodel.getAnOrder(id);
    res.json({
      message: `success`,
      data: { ...gettingorder },
    });
  } catch (error) {
    next();
  }
};
const deleteAnOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as unknown as number;
    const deletingorder = await ordermodel.delete(id);
    res.json({
      message: `success`,
      data: { ...deletingorder },
    });
  } catch (error) {
    next();
  }
};
const addAnOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const op: orders_products = {
      product_id: req.body.product_id as number,
      quantity: req.body.quantity as number,
      users_id: req.body.users_id as number,
    };

    const adding = await ordermodel.addAproductOrder(op);
    res.json({
      message: `success`,
      data: { ...adding },
    });
  } catch (error) {
    next();
  }
};
//
orderEP.post('/', tokenChecker, create);
orderEP.post('/addAnOrder', tokenChecker, addAnOrder);
orderEP.patch('/:id', tokenChecker, update);
orderEP.get('/', tokenChecker, getAllOrders);
orderEP.get('/:id', tokenChecker, getAnOrder);
orderEP.delete('/:id', tokenChecker, deleteAnOrder);

export default orderEP;
