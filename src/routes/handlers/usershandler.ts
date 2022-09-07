import express, { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { tokenChecker } from './authhandler';
import { user, UserModel } from '../../models/user';
//
dotenv.config();
const userEP: Router = express.Router();
const secret = process.env.SECRET_TOKEN as unknown as string;
const usermodel = new UserModel();
//

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const u: user = {
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };
    const creating = await usermodel.create(u);
    const newToken = jwt.sign({ u: creating }, secret);
    res.json({
      message: `success`,
      data: { ...creating, newToken },
    });
  } catch (error) {
    next();
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const u: user = {
      id: parseInt(req.params.id),
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };
    const updating = await usermodel.update(u);
    res.json({
      message: `success`,
      data: { ...updating },
    });
  } catch (error) {
    next();
  }
};
const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const getting = await usermodel.getusers();
    res.json({
      message: `success`,
      data: { ...getting },
    });
  } catch (error) {
    next();
  }
};
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as unknown as number;
    const gettinguser = await usermodel.getuser(id);
    res.json({
      message: `success`,
      data: { gettinguser },
    });
  } catch (error) {
    next();
  }
};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as unknown as number;
    const deleting = await usermodel.delete(id);
    res.json({
      message: `success`,
      data: { deleting },
    });
  } catch (error) {
    next();
  }
};
const loginauth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usermodel.loginauth(req.body.id, req.body.password);
    if (user === null) {
      next();
    }
    const token = jwt.sign({ user }, secret);
    res.json({
      message: `success`,
      data: { token },
    });
  } catch (error) {
    next();
  }
};
//

userEP.post('/', create);
userEP.patch('/:id', tokenChecker, update);
userEP.get('/', tokenChecker, getUsers);
userEP.get('/:id', tokenChecker, getUser);
userEP.delete('/:id', tokenChecker, deleteUser);
userEP.post('/authenticate', loginauth);
export default userEP;
