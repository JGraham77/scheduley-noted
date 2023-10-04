import express from "express";
import utils from "../../utils";
import { checkEm } from "../../middlewares/login";

const router = express.Router();

router.post("/", checkEm, (req, res) => {
    const token = utils.tokens.sign({ id: req.user.id });
    res.status(200).json({ message: "Successfully logged in!", token });
});

export default router;
