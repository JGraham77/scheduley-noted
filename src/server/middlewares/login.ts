import { RequestHandler } from "express";
import utils from "../utils";
import db from "../db";

const checkEm: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    const allAreGood = utils.validators.allStringsAreGood([
        [email, 128],
        [password, 1000],
    ]);

    if (!allAreGood) {
        res.status(400).json({ message: "Must include valid email/username and password" });
    }

    const isEmail = utils.validators.isEmail(email);

    try {
        const [user] = await db.Users.by(isEmail ? "email" : "username", email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const passwordsMatch = await utils.passwords.compareHash(password, user.password);

        if (!passwordsMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.emailVerified) {
            const token = utils.tokens.sign({ id: user.id });
            res.status(200).json({ message: "Successfully logged in!", token });
        } else {
            // services.email.auth.resendVerificationEmail();
            res.status(403).json({ message: "Verify your email in order to log in." });
        }
    } catch (error) {
        const err = error as unknown as Error;
        console.log(error);
        res.status(500).json({ message: "Could not process this request at this time." });
    }
};
