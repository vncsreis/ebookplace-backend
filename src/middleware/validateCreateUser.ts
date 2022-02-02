import { NextFunction, Request, Response } from 'express';
import { UserInfoInput } from '../models/UserInfoInput';
import validator from 'validator';

export function validateCreateUser(
  req: Request<any, any, UserInfoInput>,
  res: Response,
  next: NextFunction,
) {
  const { email, name, password, picture } = req.body;
  const errors: string[] = [];

  if (!validator.isEmail(email)) {
    errors.push('Invalid e-mail');
  }
  if (!validator.isAlpha(name)) {
    errors.push('Invalid name');
  }

  if (errors.length === 0) {
    next();
  } else {
    return res.status(400).json({ errors: [...errors] });
  }
}
