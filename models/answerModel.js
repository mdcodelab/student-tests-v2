import mongoose from "mongoose";

const {Schema} = mongoose;

const AnswerSchema = new Schema(
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
        default: "0"
      },
    ],
  },
  { timestamps: true } //automatically create "createdAt & updatedAt"
);

export default mongoose.model("Answer", AnswerSchema);
