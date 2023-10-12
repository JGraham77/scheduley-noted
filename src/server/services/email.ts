import Mailgun from "mailgun.js";
import FormData from "form-data";
import { v4 } from "uuid";
import db from "../db";
import { mg, domain } from "../config";
import { User } from "../types";
import { create_8_digit_numb, create_uuid } from "./create_codes";

if (!mg.key) throw new Error("Missing required key for mailgun");

const client = new Mailgun(FormData).client({
    username: "api",
    key: mg.key,
});

interface MailProps {
    to: string;
    from: string;
    subject: string;
    body: string;
}

const sendMail = ({
    to,
    from,
    subject = "We've been trying to reach you are your car's extended warranty",
    body,
}: MailProps) => {
    return client.messages.create(mg.domain!, { to, from, subject, html: body });
};

const FIFTEEN_MINUTES = 1000 * 60 * 15;

export const sendVerificationEmail = async (user_id: User["id"], email: string) => {
    try {
        const uuid = await create_uuid(user_id);
        await sendMail({
            to: email,
            from: "<Registration> registration@jgraham.dev",
            subject: "Verify your account for SchudleyNoted!",
            body: `
            <h1>Click the link to verify your account</h1>
            <a href="${domain.base}/verify?code=${uuid}">Verify</a>
        `,
        });
    } catch (error) {
        throw error;
    }
};

export const sendMFAEmail = async (user_id: User["id"], email: string) => {
    try {
        const id = await create_8_digit_numb(user_id);

        await sendMail({
            to: email,
            from: "<Security> noreply@jgraham.dev",
            subject: "Verify your account for SchudleyNoted!",
            body: `
            <h1>Your MFA code is <strong>${id}</strong></h1>
            <a href="${domain.base}/login">Verify</a>
        `,
        });
    } catch (error) {
        throw error;
    }
};

export const sendMagicLink = async (user_id: User["id"], email: string) => {
    try {
        const uuid = await create_uuid(user_id);
        await sendMail({
            to: email,
            from: "<Magic Link> noreply@atlc.dev",
            subject: "Here is your magic link to login",
            body: `
    <h1>Click the link to <a href="${domain.base}/verify?code=${uuid}&type=magic">login</a></h1>
    <h2>Please note that any previous codes will be invalidated, and this code will only be valid for 15 minutes.</h2>
        `,
        });
    } catch (error) {
        throw error;
    }
};
