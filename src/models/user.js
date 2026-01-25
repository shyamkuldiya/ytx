import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: string,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
