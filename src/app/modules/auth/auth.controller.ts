// src/modules/auth/auth.controller.ts
import { Request, RequestHandler, Response } from "express";
import { loginUser, registerUser } from "./auth.service";


export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({ message: "Registered", data: result });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await loginUser(req.body);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ message: "Login successful", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


export const logout = (req: Request, res: Response) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out" });
};


export const getMe: RequestHandler = (req, res) => {
  const user = (req as any).user; 

  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  res.json({
    user: {
      id: user.id,
      name: user.name || "",
      email: user.email ,
    },
  });
};