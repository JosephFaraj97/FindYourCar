import mongoose from "mongoose";
import IUser from "../interface/user";

export const userSchema = new mongoose.Schema<IUser>({
  id: String,
  email: { type: String, unique: true },
  name: String,
  role: String,
  password: String,
  status: String,
});
