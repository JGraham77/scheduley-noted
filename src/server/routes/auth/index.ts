import express from "express";
import registrationRouter from "./register";
import emailRouter from "./email";
import loginRouter from "./login";
import controllers from "../../controllers";
import mw from "../../middlewares";

const router = express.Router();

router.get("/register", registrationRouter);
router.get("/login", loginRouter);
router.get("/email", emailRouter);
router.get("/verify", mw.tokenCheck, controllers.auth.tokenCheck);

export default router;
