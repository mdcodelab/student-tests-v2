"use server";
import connectDB from "@/config/database";
import User from "@/models/userModel";
import * as z from "zod";
//import bcrypt from "bcryptjs"; 

const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required" }),
});

export const login = async (value) => {
  try {
    await connectDB();

    const user = await User.findOne({ email: value.email });
    if (!user) {
      return {error: "Invalid email."}
    }

    const validateFields = LoginSchema.safeParse(value);
    if (!validateFields.success) {
      return { error: "Invalid fields!" };
    } else {
        return { success: "Login successfully." };
    }
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
