import bcrypt from 'bcryptjs';
import { User } from '../user/user.model';
import { signToken } from '../../../utils/jwt';
import { ILoginInput, IRegisterInput } from './auth.interface';

export const registerUser = async (payload: IRegisterInput) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.create({ ...payload, password: hashedPassword });
  return { user };
};

export const loginUser = async (payload: ILoginInput) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(payload.password, user.password);
  if (!match) throw new Error('Wrong password');

  const token = signToken({ 
    id: user._id, 
    email: user.email,
    name: user.name,  
  });

  return { user, token };
};

