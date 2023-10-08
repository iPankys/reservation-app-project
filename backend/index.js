import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("hello");
});

// middlewares

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/rooms", roomsRoute);
app.use("/api/v1/users", usersRoute);

// error handler middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    massage: errorMessage,
    stack: err.stack,
  });
});

// Database configuration
mongoose.connect(process.env.MONGOURL).catch((err) => {
  throw err;
});

mongoose.connection.on("connected", () => {
  console.log("successfully connected to database");
});

mongoose.connection.on("Disconnected", () => {
  console.log("Disconnected from database");
});

// listen for changes
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
