require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./src/router/auth-router/index");
const courseRoutes = require("./src/router/course-router/index");
const studentRoutes = require("./src/router/student-router/index");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO;

//logic cho phép cả 2 nguồn 1 lúc chứ không phải 1 nguồn 
const allowedOrigins = [process.env.CLIENT, process.env.CLIENT_VERCEL];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// database connect
mongoose
  .connect(MONGO)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));

//routers configuration
app.use("/auth", authRoutes);
app.use("/dashboard/course", courseRoutes);
app.use("/student/course", studentRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
