import connectDB from "@/config/database";

export const GET = async (request) => {
  await connectDB();
  try {
    // Return the JSON response with the correct status
    return new Response(
      JSON.stringify({ message: "Hello world", status: 200 }, { status: 200 })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something was wrong" }, { status: 500 })
    );
  }
};
