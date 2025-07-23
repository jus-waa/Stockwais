import express from "express";
const app = express();
const port = process.env.PORT || 5000;

import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieSession from "cookie-session";

import authRoutes from "./routes/auth.route.js";
import './utils/passport.js';

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/api/v1/auth', authRoutes);

//tests
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Auth w/ Google</a>');
});

//authenticate
app.get('/auth/google', 
    passport.authenticate('google', {
        scope:
        ['email', 'profile']
    })
);

app.get('/protected', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});