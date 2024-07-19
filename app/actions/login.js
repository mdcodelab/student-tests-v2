"use server";
import connectDB from "@/config/database";
import User from "@/models/userModel";
import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const login = async (value)=> {
    try {
        await connectDB();
        const user = await User.findOne({email: value.email});
        const validateFields = LoginSchema.safeParse(value);
        if (!validateFields.success) {
          return { error: "Invalid fields!" };
        }

    } catch (error) {
       console.error(error); 
    }
}