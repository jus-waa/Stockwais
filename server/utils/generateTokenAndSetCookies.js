import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateTokenAndSetCookies = (res, userId) => {
    //generate access token
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS, { //userId = what u store
        expiresIn: "15m", //valid for 15 mins
    });
    //generate refresh token 
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH, {
        expiresIn: "7d", //valid for 7 days
    });
    //cookies for access token
    res.cookies("acessToken", accessToken, { //"name of token", jwt token value,
        //security options
        httpOnly: true, //preves XSS attacks/ client side access
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //prevents CSRF attacks
        maxAge: 15 * 60 * 1000, //15mins token expiry
        path: "/" //restricts the cookie to a ceratin path
    });

    res.cookies("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7days token expiry
        path: "/"
    });

    return { accessToken, refreshToken };
};