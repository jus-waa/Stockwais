import jwt from "jwt";

export const generateTokenAndSetCookie = (res, userId) => {
    //generate jwt
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { //userId = what u store
        expiresIn: "7d", //valid for 7 days
    });

    res.cookies("token", token, { //"name of token", jwt token value,
        //security options
        httpOnly: true, //preves XSS attacks/ client side access
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d expiry
        path: "/" //restricts the cookie to a ceratin path
    });
}