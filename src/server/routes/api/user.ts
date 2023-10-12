import express from "express";
import { tokenCheck } from "../../middlewares/verify";
import db from "../../db";
import { User } from "../../types";
import { sendVerificationEmail } from "../../services/email";

const router = express.Router();

router.put("/mfa", tokenCheck, async (req, res) => {
    const { preference } = req.body as { preference: User["mfa_preference"] };

    if (!["phone", "email", "none"].includes(preference)) {
    }

    try {
        const [user] = await db.users.by("id", req.user.id);

        await db.users.update.mfa(preference, req.user.id);

        if (preference === "phone") {
            if (!user.phone_verified) {
                // Resend text
                return res.status(403).json({ message: "You cannot do that action until you verify your phone" });
            } else {
                await db.users.update.mfa("phone", req.user.id);
            }
            return res.status(201).json({ message: "Preference updated!" });
        }
        if (preference === "email") {
            if (!user.email_verified) {
                await sendVerificationEmail(req.user.id, user.email);
                return res.status(403).json({ message: "You cannot do that action until you verify your email" });
            } else {
                await db.users.update.mfa("email", req.user.id);
                return res.status(201).json({ message: "Preference updated!" });
            }
        }
        if (preference === "none") {
            await db.users.update.mfa("none", req.user.id);
            return res.status(201).json({ message: "Preference updated!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Couldn't update MFA preferences at the moment" });
    }
});

export default router;
