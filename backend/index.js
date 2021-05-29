import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import producrRoutes from "./routes/productRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use("/api/products", producrRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
