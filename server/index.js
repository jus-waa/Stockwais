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
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Auth w/ Google</a>');
});

app.get('/protected', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});