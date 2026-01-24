import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/api-response.js";

export const registerUser = asyncHandler(async (req, res) => {
  // get All the fields from the client
  // check if all exists
  // check if there is already an user with exisiting email or usernam
  // upload avatar and banner to cloudinary
  // return the response
  const { fullName, username, email, password } = req.body;

  // [name,username,email,password].some(e>e.trim()===""){
  if (!fullName || !username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const exisitingUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (exisitingUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Api file is required");
  }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (createdUser) {
    throw new ApiError(500, "Somethign went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
});
