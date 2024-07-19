"use server";
import connectDB from "@/config/database";
import User from "@/models/userModel";
import * as z from "zod";


export const register = async (value) => {
    try {
        await connectDB();
        const existingUser = await User.findOne({email: value.email});
        if(existingUser) {
            throw new Error("Email already exists!");
        }
        const user = await User.create({
            name: value.name,
            email: value.email,
            password: value.password
        })
        return user;
    } catch (error) {
       console.error(error); 
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