"use server";

import connectDB from "@/config/database";
import User from "@/models/userModel";
import * as z from "zod";
import bcrypt from "bcrypt";

const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Valid email is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export const register = async (values) => {
  try {
    await connectDB();
    const validateFields = RegisterSchema.safeParse(values);
    const { name, email, password } = validateFields.data;

    if (!validateFields.success) {
      const errorMessages = validateFields.error.errors
        .map((error) => error.message)
        .join(", ");
      return { error: errorMessages };
    }

    const existingUser = await User.findOne({
      email: validateFields.data.email,
    });
    if (existingUser) {
      return { error: "Email already in use." };
    }

    c

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //TODO: send verification token email

    return { success: "Registered successfully." };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred during registration." };
  }
};

export const getUser = async (id) => {
  await connectDB();
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("You are not authorized!");
    }
    return user;
  } catch (error) {
    console.error(error);
  }
};
