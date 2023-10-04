import express from "express";
import db from "../../db";
import utils from "../../utils";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, username, phone, password } = req.body;

    const missingProperties = utils.validators.checkForMissingProperties({ name, email, username, phone, password });

    if (missingProperties) {
        return res.status(400).json({ message: "Missing a property", missingProperties });
    }

    if (
        !utils.validators.allStringsAreGood([
            [name, 64],
            [username, 32],
            [email, 128],
            [phone, 16],
            [password, 1000],
        ])
    ) {
        return res.status(400).json({ message: "Some values are not strings or exceed their max length" });
    }

    if (!utils.validators.isEmail(email)) {
        res.status(400).json({ message: "Please use a valid email" });
        return;
    }

    if (utils.validators.isEmail(username)) {
        res.status(400).json({ message: "Username cannot be an email." });
        return;
    }

    try {
        const hashed = await utils.passwords.slinging_slasher(password);
        const result = await db.users.register({ name, email, username, password: hashed, phone });
        // verify email verification

        res.status(201).json({
            message: "Successfully registered!  Please check your email to verify your account!",
            id: result.insertId,
        });
    } catch (error) {
        res.status(500).json({ message: "Server's broke" });
    }
});

export default router;
