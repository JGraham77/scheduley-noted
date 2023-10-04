import express from "express";
import { checkEm } from "../../middlewares/login";

const router = express.Router();

export default router;
// const token = utils.tokens.sign({ id: user.id });
// res.status(200).json({ message: "Successfully logged in!", token });
