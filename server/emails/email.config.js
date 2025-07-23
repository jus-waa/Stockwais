import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const client = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    },
});

export const sender = {
    email: process.env.GMAIL_USER,
    name: "Stockwais"
};