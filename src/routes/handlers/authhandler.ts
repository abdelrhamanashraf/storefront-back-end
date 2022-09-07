import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//
dotenv.config();

const secret = process.env.SECRET_TOKEN as unknown as string;

const errHandler = (next: NextFunction) => {
  next(`failed to authenticate`);
};
export const tokenChecker = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, secret);
        if (decode) {
          next();
        } else {
          errHandler(next);
        }
      } else {
        errHandler(next);
      }
    } else {
      errHandler(next);
    }
  } catch (error) {
    errHandler(next);
  }
};
