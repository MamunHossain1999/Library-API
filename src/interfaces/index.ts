import { Request } from "express";

export interface IUserFromToken {
  id: string;
  name: string;
  email: string;
}

export interface DecodedUser {
  id: string;
  name?: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: DecodedUser;
}
