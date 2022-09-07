import express, { Request, Response, NextFunction, Router } from 'express';
import { tokenChecker } from './authhandler';
import { product, productModel } from '../../models/product';
//
const productEP: Router = express.Router();
const productmodel = new productModel();
//
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const p: product = {
      name: req.body.name as string,
      price: req.body.price as number,
    };
    const creating = await productmodel.create(p);
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
    const p: product = {
      id: parseInt(req.params.id),
      name: req.body.name as string,
      price: req.body.price as number,
    };
    const updating = await productmodel.update(p);
    res.json({
      message: `success`,
      data: { updating },
    });
  } catch (error) {
    next();
  }
};
const getAllproducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gettingProducts = await productmodel.getAllproducts();
    res.json({
      message: `success`,
      data: { ...gettingProducts },
    });
  } catch (error) {
    next();
  }
};
const getAproduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as unknown as number;
    const gettingProduct = await productmodel.getAproduct(id);
    res.json({
      message: `success`,
      data: { gettingProduct },
    });
  } catch (error) {
    next();
  }
};
const deleteAproduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as unknown as number;
    const deleting = await productmodel.delete(id);
    res.json({
      message: `success`,
      data: { deleting },
    });
  } catch (error) {
    next();
  }
};
//
productEP.post('/', tokenChecker, create);
productEP.patch('/:id', tokenChecker, update);
productEP.get('/', getAllproducts);
productEP.get('/:id', getAproduct);
productEP.delete('/:id', tokenChecker, deleteAproduct);

export default productEP;
