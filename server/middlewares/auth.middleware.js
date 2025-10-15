import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    //* get jwt token
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorixed request");
    }

    //* decode jwt token

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //* find user from the model and remove password and refreshtoken

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
