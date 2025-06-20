import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from './app';


dotenv.config();

const port = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log('Database connection failed', err);
  }
}

main();
