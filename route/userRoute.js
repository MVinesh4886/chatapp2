const express = require("express");
const userRouter = express.Router();
const {
  RegisterUser,
  LoginUser,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
  GetAllUsers,
  GetSingleUser,
  DeleteUser,
} = require("../controller/UserCtrl");

// Register User route
userRouter.post("/signUp", RegisterUser);

// Login route
userRouter.post("/signIn", LoginUser);

// Email verification
userRouter.get("/verifyEmail/:Token", VerifyEmail);

userRouter.get("/signUp", GetAllUsers);

userRouter.post("/forgotPassword", ForgotPassword);

// Reset password
userRouter.post("/resetPassword", ResetPassword);

//getSingleUser
userRouter.get("/:id", GetSingleUser);

//Delete user
userRouter.delete("/:id", DeleteUser);

module.exports = userRouter;
