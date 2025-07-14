import express from "express";
const app = express();

const options = {
    timeZone: "Asia/Manila",
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
}

const reqTime = (req, res, next) => {
    req.requestTime = new Date().toLocaleString("en-PH", options);
    next()
}

app.use(reqTime);

app.get("/", (req, res) => {
    let resText = "Hello world<br>"
    resText += `Request time: ${req.requestTime}`;
    res.send(resText)
});

app.listen(3000, () => {
    console.log("Server running at port: 3000");
});

/*
import express from "express";
const app = express();
const port = process.env.PORT || 5000;

import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
*/