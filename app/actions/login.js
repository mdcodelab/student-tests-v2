"use server";
import connectDB from "@/config/database";
import User from "@/models/userModel";
import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required." }), 
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const login = async (value) => {
  await connectDB();
  const validateFields = LoginSchema.safeParse(value);
  if(!validateFields.success) {
    return {error: "Invalid fields."}
  }
  const existingUser = await User.findOne({email: value.email});
  if(!existingUser) {
    return {error: "Invalid credentials."}
  }

  return {success: "Login successful!."}
}

// export const login = async (value) => {
//   try {
//     await connectDB();

//     const validateFields = LoginSchema.safeParse(value);
//     if (!validateFields.success) {
//       const errorMessages = validateFields.error.errors
//         .map((error) => error.message)
//         .join(", ");
//       return { error: errorMessages };
//     }


//     const user = await User.findOne({ email: value.email });

//     if (!user) {
//       return { error: "Invalid email." };
//     }

//     return { success: "Login successfully." };
//   } catch (error) {
//     console.log("Error during login:", error);
//     return { error: "An unexpected error occurred. Please try again later." };
//   }
// };
