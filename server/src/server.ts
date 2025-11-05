import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "API working"
  });
});
app.listen(PORT, () => {
  console.log(`API is running in port: ${PORT}`);
});;
