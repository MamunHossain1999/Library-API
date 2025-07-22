// src/app/modules/auth/auth.interface.ts

export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
}

// src/interfaces/index.ts
export interface DecodedUser {
  id: string;
  name?: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IUserFromToken {
  id: string;
  name: string;
  email: string;
}

export interface IGoogleUser {
  name: string;
  email: string;
  googleId?: string;
  picture?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name:string;
    email: string;
  };
}