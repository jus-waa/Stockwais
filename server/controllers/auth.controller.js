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
    } catch (error) {
        
    }
};