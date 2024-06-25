const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(express.json());

const port = 8080;

app.use(bodyParser.json()); //aplication/json

//routes
const authRoutes = require("./routes/auth");
const isAuth = require("./middleware/is-auth");
const schoolRoutes = require("./routes/school");
const sessionRoutes = require("./routes/session");
const termRoutes = require("./routes/term");
const blogRoutes = require("./routes/blog");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,PATCH ,DELETE , OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/auth", authRoutes);
// app.use("/auth", isAuth, authRoutes);
app.use("/school", schoolRoutes);

app.use("/session", sessionRoutes);

app.use("/term", termRoutes);

app.use("/blog", blogRoutes);

//whenever an error is thrown with next()
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGODB_API)
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => console.error(err));
