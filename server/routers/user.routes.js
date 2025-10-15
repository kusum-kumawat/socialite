import { Router } from "express";
import {
  loginUser,
  registerUser,
  searchUser,
  createPost,
  userProfile,
  logout,
  getCurrentUser,
  follow,
  follower,
  posts,
  isFollowing,
  uploadAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logout);
router.route("/auth/me").get(verifyJWT, getCurrentUser);
router.route("/search").get(searchUser);
router
  .route("/create-posts")
  .post(verifyJWT, upload.single("post"), createPost);
router.route("/profile/:userId").get(userProfile);
router.route("/follow/:userId").post(verifyJWT, follow);
router.route("/follow/:userId/follower").get(verifyJWT, follower);
router.route("/posts").get(verifyJWT,posts);
router.route("/isFollowing/:userId").get(verifyJWT,isFollowing);
router.route("/upload/avatar").post(verifyJWT, upload.single("avatar"),uploadAvatar);

export default router;
