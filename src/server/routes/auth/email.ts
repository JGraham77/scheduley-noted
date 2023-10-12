import express from "express";
import controllers from "../../controllers";

const router = express.Router();

type TokenType = "magic" | "verify";

router.get("/verify", controllers.auth.verify);

router.get("/magic", controllers.auth.magic);

export default router;
