import path from "path";
import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import producrRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
console.log(__dirname);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(__dirname, "frontend/build/inex.html");
  });
} else {
  app.get("/", (req, res) => {
    res.send({
      message: "Hello World",
    });
  });
}

app.use(express.json());

app.use("/api/products", producrRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
