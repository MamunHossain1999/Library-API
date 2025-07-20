import { Request, Response } from 'express';
import { loginUser, registerUser } from './auth.service';

export const register = async (req: Request, res: Response) => {
  const result = await registerUser(req.body);
  res.status(201).json({ message: 'Registered', data: result });
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await loginUser(req.body);
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
      .json({ message: 'Login successful', user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
