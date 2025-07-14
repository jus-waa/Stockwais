import express from "express";
const app = express();

import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;

app.use('/', authRoutes => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});