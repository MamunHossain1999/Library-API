import { model, Schema } from "mongoose"
import { IUser } from "./user.interface"

const userSchema = new Schema<IUser>({
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true}
});

const User = model<IUser>("User", userSchema);
export default User;