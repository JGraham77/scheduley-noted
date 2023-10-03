import express from "express";
import registrationRouter from "./register";
import emailRouter from "./email";

const router = express.Router();

router.get("/register", registrationRouter);
router.get("/email", emailRouter);

export default router;
