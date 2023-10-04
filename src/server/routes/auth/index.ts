import express from "express";
import registrationRouter from "./register";
import emailRouter from "./email";
import loginRouter from "./login";

const router = express.Router();

router.get("/register", registrationRouter);
router.get("/login", loginRouter);
router.get("/email", emailRouter);

export default router;
