import connectDB from "@/config/database";
import User from "@/models/userModel";

export const getUserByEmail = async ()=> {
    try {
        await connectDB();
        return await User.findOne({email})
        
    } catch (error) {
        return null;  
    }
}

export const geyUserById = async (id) => {
    try {
        await connectDB();
        return User.findOneById({id})
    } catch (error) {
      return null  
    }
}

export const getAllUsers = async () => {
    try {
        await connectDB();
        const users = await User.find({});
        return users;
    } catch (error) {
        
    }
}

