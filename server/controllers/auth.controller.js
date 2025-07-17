import db from "../db/conn.js";
import bcryptjs from "bcryptjs";

export const signup = async(req, res) => {
    //extracting values
    const { name, email, phone_number, password } = req.body;
    try {
        //check for empty fields
        if (!name || !email || !phone_number || !password) {
            res.status(400).json({
                status: "failed",
                message: "All fields are required."
            });
        }
        //check if user exists via email
        const checkEmail = "SELECT email FROM users WHERE email = $1"; 
        const valueEmail = [email];
        const userExist = await db.query(checkEmail, valueEmail);
        if (userExist.rows.length > 0) {
            res.status(400).json({
                status: "failed",
                message: "All fields are required."
            });
        }
        //hashing password
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000);
        const verificationTokenExpiresAt = new Date(Date.now() + 10 * 60 * 60 * 1000) //1hr
        //insert user to db
        const insertUser = "INSERT INTO users (name, email, phone_number, password, verification_token, verification_expires_at) VALUES ($1, $2, $3, $4, $5, $6) returning *";
        const valueUser = [name, email, phone_number, hashedPassword, verificationToken, verificationTokenExpiresAt];

        const resultUser = await db.query(insertUser, valueUser);
        //generate token and set cookie
        const user = resultUser.rows[0];    
        generateTokenAndSetCookie();

        //send OTP to email

        //or

        //send OTP to phone number

        //if success
        res.status(201).json({
            status: "success",
            message: "Account created successfully.",
            //use spread op for user
            user: {
                ...user,
                password: undefined,
            }
        });
    } catch (err) {
        console.log("Signup error: " + err);
        res.status(400).json({
            status: "failed",
            message: err.message
        });
        
    }
};