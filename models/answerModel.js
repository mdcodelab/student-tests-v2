import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,//use user id
      ref: "User",
      required: true,
    }, 
    answers: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true } //automatically create "createdAt & updatedAt"
);

export default mongoose.model("Answer", AnswerSchema);
