"use server";

import connectDB from "@/config/database";
import User from "@/models/userModel";
import * as z from "zod";
import bcrypt from "bcryptjs";

const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Valid email is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});


export const register = async (value) => {
  await connectDB();
  const validateFields = RegisterSchema.safeParse(value);
  if (!validateFields.success) {
    return { error: "Invalid fields." };
  }

  const { name, email, password } = validateFields.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: "Email already in use." };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // TODO: Trimite email de verificare

  return { success: "Registration successful." };
};
