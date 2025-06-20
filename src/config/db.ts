import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config(); 
const connectDB = async () => {
    //mongoose er sathe mongoDB er connection establish korar jonno
    //mongodb+srv://testDataBase:
    try {
        const uri = process.env.DATABASE_URL as string;
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;