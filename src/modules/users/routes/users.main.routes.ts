import express from "express";
import auth from "./users.auth.routes";
import update from "./users.update.routes";

const userRouter = express.Router();

userRouter.use(auth);
userRouter.use(update);

export default userRouter;
