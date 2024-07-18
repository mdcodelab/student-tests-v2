import connectDB from "@/config/database";
import User from "../../../models/userModel";

export const GET = async (request) => {
  try {
    await connectDB();
    const users = await User.find({});
    return new Response(
      JSON.stringify(users, { status: 200 })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something was wrong" }, { status: 500 })
    );
  }
};

const POST = async(request)=> {
  
}
