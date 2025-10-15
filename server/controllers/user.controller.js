import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
// import { Follow } from "../models/Follow.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Post } from "../models/Post.model.js";
import { Follow } from "../models/Follow.modal.js";

//? -------------------------------- generate access and refresh token ---------------------------------

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    //* Save the refresh token to the database

    user.refreshToken = refreshToken;

    //* Update the user in the database with the new refresh token

    const userr = await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      400,
      "something went wrong while creating refresh and access token"
    );
  }
};

//? ----------------------------------- register user ------------------------------------------------

const registerUser = asyncHandler(async (req, res) => {
  // * get detail from req.body

  const { fullname, username, email, password } = req.body;

  // * validatate
  console.log(username);

  // if ([username, email, password].some((field) => field?.trim() === "")) {
  //   throw new ApiError(400, "all fields are required");
  // }
  if (!(username && email && password && fullname)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // console.log(req.files)

  // * check if user already exists

  const existentUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existentUser) {
    console.log(existentUser);
    return res.status(400).json({ message: "already used username or email" });
  }

  // * create user object , user entry in db

  const user = await User.create({
    fullname: fullname.toLowerCase(),
    username: username.toLowerCase(),
    email,
    password,

    // coverImage: coverImage?.url || "",
  });

  console.log("USER OBJECT ", user._id);

  // * create refresh and access token

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // * remove password and refreshtoken
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // * check for user creation

  if (!createdUser) {
    return res
      .status(404)
      .json({ message: "something went wrong while creating user" });
  }

  //* cookie options

  const options = {
    httpOnly: true,
    secure: true,
  };

  // * send response

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: createdUser,
          refreshToken,
          accessToken,
        },
        "user is created succesfully"
      )
    );
});

//? ----------------------------------------- login user ----------------------------------------------

const loginUser = asyncHandler(async (req, res) => {
  //* get detail from body

  const { username, password } = req.body;

  //* validate input

  if (!(password && username)) {
    throw new ApiError(400, "please provide an username and password");
  }

  // if ([username, email, password].some((field) => field?.trim() === "" || !field)) {
  //   throw new ApiError(400, "all fields are required.......");
  // }

  console.log(username, password);

  //* get user from model

  // const user = await User.findOne({ email }).select("+password");
  const user = await User.findOne({
    username,
  });

  console.log(user);

  //* check for user existance

  if (!user) {
    throw new ApiError(401, "user does not exist");
  }
  //* Check if password matches

  const isPasswordvalid = await user.isPasswordCorrect(password);
  if (!isPasswordvalid) {
    throw new ApiError(401, "Invalid credentials or password");
  }
  //* Create refresh token

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  //* remove password and refreshToken

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // * cookie object
  const cookieOptions = {
    // expires: new Date(Date.now() + process.env.JWT_CO.REFRESH_EXPIRATION_DAYS), //? Session cookies: Cookies without an expires option are considered session cookies and are deleted when the browser session ends (usually when the user closes the browser tab or window).
    httpOnly: true,
    secure: true,
  };

  //* Return json response

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user logged in succesfully"
      )
    );
});

//? ---------------------------------------- logout user ------------------------------------

const logout = asyncHandler(async (req, res) => {
  // * set refreshToken as undefined

  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { RefreshToken: undefined } },
    { new: true }
  );
  // * cookie options

  const options = {
    httpOnly: true,
    secure: true,
  };

  // * send response

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User succesfully logout"));
});

//? --------------------------------- refresh access token ----------------------------------

const refreshAccessToken = asyncHandler(async (req, res) => {
  //* get encoded refresh token from cookies

  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  //* decode encoded refresh token

  const decodedToken = Jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  //* get user from the model

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(401, "invalid refresh token");
  }

  //* match incoming and stored refresh token

  if (incomingRefreshToken != user?.refreshToken) {
    throw new ApiError(401, "token has been changed. please login again.");
  }

  //* generate new refresh and access token

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  //* cookie options

  const options = {
    httpOnly: true,
    secure: true,
  };

  //* return response

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: { refreshToken, accessToken },
        },
        "refresh accesss token"
      )
    );
});

//? -------------------------------- change password -------------------------------

const changePassword = asyncHandler(async (req, res) => {
  //* get detail from body

  const { username, currentPassword, newPassword } = req.body;
  console.log(username, currentPassword);

  //* get user from the database by id

  // const user = await User.findById(req.user?._id).select({ password: 1 });
  const user = await User.findOne({ username });

  //* check user is exist or not

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  //* make sure that the current password is correct
  if (
    currentPassword !== undefined &&
    !(await user.isPasswordCorrect(currentPassword))
  ) {
    throw new ApiError(401, "Password is wrong");
  }
  //* update user's new password

  user.password = newPassword;
  await user.save();

  //* return response

  return res
    .status(200)
    .json(new ApiResponse(200, "User Password has been changed"));
});

//? ------------------------------------ get current user --------------------------------------

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select(
    "-refreshToken -password -email "
  );
  if (!user) return new ApiError(404, "User not found");
  return res.status(200).json(new ApiResponse(200, user, "user is logged in "));
});

//? --------------------------------------- create post ---------------------------------

const createPost = asyncHandler(async (req, res) => {
  console.log("CAPTION : ", req.body.caption);
  // * get user

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError("The user was not found");
  }
  // * check user send the post

  if (!req.file?.path || Object.keys(req.file).length === 0) {
    throw new ApiError(400, "please upload post");
  }

  const postLocalPath = req.file?.path;

  if (!postLocalPath) {
    throw new ApiError(400, "post is required");
  }

  // * upload post to the cloudinary

  const post = await uploadOnCloudinary(postLocalPath);

  if (!post) {
    throw new ApiError(
      500,
      "server error post is not uploaded to the cloudinary"
    );
  }

  const updatedUSer = await Post.create({
    user_id: user._id,
    media_url: post.url,
    type: post.resource_type,
    caption: req.body.caption ? req.body.caption : "",
  });

  if (!updatedUSer) {
    throw new ApiError(500, "somthing went wrong while creating a user");
  }

  console.log("UPDATED USER ----> ", updatedUSer);

  return res
    .status(201)
    .json(new ApiResponse(200, updatedUSer, "uploaded sussessfully"));
});

//? ------------------------------------- upload avatar ------------------------------------

const uploadAvatar = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(403, "you are not logged in , please login ");
  }

  // * check user send the post

  if (!req.file?.path || Object.keys(req.file).length === 0) {
    throw new ApiError(400, "please upload post");
  }

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "post is required");
  }

  // * upload post to the cloudinary

  const avtr = await uploadOnCloudinary(avatarLocalPath);

  if (!avtr) {
    throw new ApiError(
      500,
      "server error post is not uploaded to the cloudinary"
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { avatar: avtr.url },
    { new: true }
  ).select("-password");

  return res.json(new ApiResponse(200, updatedUser, "message"));
});

//? ------------------------------------ update account detail -----------------------

const updateAccountDetail = asyncHandler(async (req, res) => {
  const { email, username } = req.body;

  //* validate

  if (!(email && username)) {
    throw new ApiError(400, "Email and username are required");
  }

  //* update db
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        email,
        username,
      },
    },
    { new: true }
  ).select("-password");

  //* return response

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Updated successfully"));
});

//? ------------------------------------- update avatar ------------------------

const updateAvatar = asyncHandler(async (req, res) => {
  //* get avatar image
  console.log("req.file", req.file);

  //* avatar local path

  const avatarLocalPath = req.file?.path;

  //* upload on cloudinary

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  //* update db

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: avatar.url } },
    { new: true }
  ).select("-password");

  //* return response

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "user avatar updated successfully")
    );
});

//? ----------------------------------- update cover image ---------------------------------

const updateCoverImage = asyncHandler(async (req, res) => {
  //* get avatar image
  console.log("req.file", req.file);

  //* avatar local path

  const coverImageLocalPath = req.file?.path;

  //* upload on cloudinary

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  //* delete earlier coverImage from cloudinary

  //* update db

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { coverImage: coverImage.url } },
    { new: true }
  ).select("-password");

  //* return response

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "user cover image updated successfully")
    );
});

//? ------------------------------ get user detail -------------------------------

const getUserDetail = asyncHandler(async (req, res) => {
  //* check if the user is requesting for himself or another user's profile

  console.log(req.params.username);
  console.log(req.params);
  const username = req.params?.username;
  const user = await User.findOne({ username }).select("-password");

  //* if user not exist

  if (!user) {
    throw new ApiError(400, "user not found");
  }

  //* return reponse

  return res.status(200).json(new ApiResponse(200, user, "success"));
});

//? ---------------------------- search user ------------------------

const searchUser = asyncHandler(async (req, res) => {
  const username = req.query.username;

  const users = await User.find({
    username: { $regex: username, $options: "i" },
  }).select("-password");

  if (!users) {
    throw new ApiError(400, "user not found while searching");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, `Search result for ${username}`));
});

// ? ----------------------------- user profile --------------------

const userProfile = asyncHandler(async (req, res) => {
  // get user id from params
  const userId = req.params.userId;
  console.log(userId);

  // Validate userId:
  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).send("Invalid userId format");
  }

  const pipeline = [
    {
      // Match the target user
      $match: { _id: new mongoose.Types.ObjectId(userId) },
    },
    {
      // Lookup posts using their `userId` and project necessary fields
      $lookup: {
        from: "posts", // Reference the "Post" collection
        localField: "_id", // Match `userId` of user with `userId` of posts
        foreignField: "user_id", // Field in "Post" referencing user
        as: "userPost", // Name of the result array
      },
    },
    {
      // Project desired user details (username, image, and posts as an array)
      $project: {
        _id: 1, // Exclude internal ID
        fullname: 1,
        username: 1,
        avatar: 1,
        followers: 1,
        following: 1,
        userPost: "$userPost",
      },
    },
  ];

  const user = await User.aggregate(pipeline);

  if (!user || user.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(user);

  return res
    .status(201)
    .json(new ApiResponse(201, user[0], "Successfully fetched user"));
});

//? ---------------------------- follow user --------------------------

const follow = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { _id } = req.user; // Assuming you have user authentication implemented

  if (userId === _id) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  const userToFollow = await User.findById(userId);
  if (!userToFollow) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if already following
  if (userToFollow.followers.includes(_id)) {
    return res.status(400).json({ message: "Already following this user" });
  }

  // Add follower to followed user
  userToFollow.followers.push(_id);
  await userToFollow.save();

  // Add followed user to current user's following
  const currentUser = await User.findByIdAndUpdate(
    _id,
    { $push: { following: userId } },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(200, { following: true }, "successfully following"));
});

// ... (other endpoints for fetching following/followers, unfollowing, etc.)

//? ---------------------------- check is following -----------------------------------

const isFollowing = async (req, res) => {
  const { userId } = req.params;
  const { _id } = req.user;

  const user = await User.findById(_id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.following.includes(userId)) {
    res.json({ following: true });
  } else {
    res.json({ following: false });
  }
};

//? ----------------------------- followers --------------------------------

const follower = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate("following"); // Populate following user data

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ following: user.following });
});

//? ---------------------------- following ------------------------------

const following = asyncHandler(async (req, res) => {
  const following = await Follow.aggregate([
    { $match: { followerId: new mongoose.Types.ObjectId(req.params.userId) } },
    {
      $lookup: {
        from: "users",
        localField: "followedId",
        foreignField: "_id",
        as: "followed",
      },
    },
    { $unwind: "$followed" },
  ]);
  res.json(following);
});

//? ------------------------------------------------------------------------------------------------------------------------------

const posts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: "user_id",
      select: "-password",
    });
    console.log(posts);

    res.json({ posts }); // Send posts data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting posts" });
  }
});

//? --------------------------------- export ------------------------------

export {
  registerUser,
  loginUser,
  logout,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  updateAccountDetail,
  updateAvatar,
  updateCoverImage,
  getUserDetail,
  searchUser,
  follow,
  follower,
  following,
  createPost,
  userProfile,
  posts,
  isFollowing,
  uploadAvatar,
};
