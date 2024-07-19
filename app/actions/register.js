"use server";
import connectDB from "@/config/database";
import User from "@/models/userModel";
import * as z from "zod";

const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters log." }),
});


export const register = async (value) => {
try {
    await connectDB();
    const existingUser = await User.findOne({email: value.email});
    if(existingUser){return existingUser};
    
    const validateFields = RegisterSchema.safeParse(value);
    if (!validateFields.success) {
      return { error: "Invalid fields!" };
    } else {
        await User.create({
        name: value.name,
        email: value.email,
        password:value.password
    });
      return { success: "Registered successfully." };
    }
} catch (error) {
    console.log(error);
}
}

const getAllUsers = async ()=> {
    try {
        await connectDB();
        const users = await User.find({});
    } catch (error) {
        console.error(error);
    }
}

export const getUser = async (user)=> {
    await connectDB();
    try {
    const user = await User.findOne({id: user._id});
    } catch (error) {
       console.error(error); 
    }
}