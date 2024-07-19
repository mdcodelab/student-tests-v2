import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [false, "Email is required"],
    },

    emailVerified: { type: Date },

    password: {
      type: String,
      required: [true, "Passwords must match"],
    },

    image: {
      type: String,
    },

    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    ],

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true }, // automatically create "createdAt & updatedAt"
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;