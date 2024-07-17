
import Answer from "../../../models/answerModel";
import connectDB from "@/config/database";

export const GET = async (request) => {
    try {
      await connectDB();
      const answers = await Answer.findById({})
    return new Response(JSON.stringify(answers, {status:200}))
    } catch (error) {
      return new Response("Something was wrong!", {status: 500})
}
}