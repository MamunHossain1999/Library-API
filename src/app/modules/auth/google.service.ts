// src/app/modules/auth/google.service.ts
import { OAuth2Client } from "google-auth-library";

import jwt from "jsonwebtoken";
import { IGoogleUser } from "./auth.interface";
import { User } from "../user/user.model";

const client = new OAuth2Client();

export const handleGoogleLogin = async (credential: string) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload() as IGoogleUser;

  if (!payload?.email) {
    throw new Error("Invalid Google token");
  }

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    user = await User.create({
      name: payload.name,
      email: payload.email,
      password: "google-user", 
      image: payload.picture,
      provider: "google",
    });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { user, token };
};
