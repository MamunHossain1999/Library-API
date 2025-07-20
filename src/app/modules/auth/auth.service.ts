
import { IRegisterInput, ILoginInput } from './auth.interface';
import bcrypt from "bcryptjs";
export const registerService = async ({ email, password}: IRegisterInput)=>{
    const existingUser = await User.findOne({email});
    if(existingUser) throw new Error('User already exists')

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({email, password:hashed});
    return await user.save();    
}


export const loginService = async ({email, password}: ILoginInput)=>{
    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }
}