import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export const User = mongoose.model<IUser>('User', userSchema);
