import mongoose from "mongoose";

const {Schema}=mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    },
    password: {
      type: String,
      required: [true, "Passwords must match"]
    },
    image: String,
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    answers: [
        {type: Schema.Types.ObjectId, ref: "Answer"}  //use answer id
    ]
  },
  { timestamps: true }  //automatically create "createdAt & updatedAt"
);

export default mongoose.model("User", UserSchema);
