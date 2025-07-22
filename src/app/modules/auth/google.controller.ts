// src/app/modules/auth/google.controller.ts
import { Request, Response } from "express";
import { handleGoogleLogin } from "./google.service";

export const googleLogin = async (req: Request, res: Response) => {
  const { credential } = req.body;

  try {
    const { user, token } = await handleGoogleLogin(credential);

    // Cookie set
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error("Google login failed:", error);
    res.status(401).json({ message: "Google login failed" });
  }
};
