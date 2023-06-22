import express from "express";
import color from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./router/authRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import productRouter from "./router/productRouter.js";
import cors from "cors";

// configure dotenv
dotenv.config();

// dbConfig
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/products", productRouter);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(
    `Server runn on ${process.env.DEV_MODE} mode ${PORT}`.bgBlue.white
  );
});
