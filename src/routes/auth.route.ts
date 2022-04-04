import UserController from "../controllers/user.controller";
import passport from "passport";
import { Router } from "express";
import { registerValidator } from "../middlewares/validatebody";

const authRouter = Router();
const userController = new UserController();

authRouter.post("/register", registerValidator, userController.handleRegister);
authRouter.get("/confirm/:activateToken", userController.handleConfirmation);
authRouter.post("/login", userController.handleLogin);
authRouter.get("/login/success", userController.handleSuccessLogin);
authRouter.get("/login/fail", userController.handleFailedLogin);
authRouter.get("/logout", userController.handleLogout);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/login/fail",
  })
);
authRouter.get("/facebook", passport.authenticate("facebook"));
authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/login/fail",
  })
);

export default authRouter;
