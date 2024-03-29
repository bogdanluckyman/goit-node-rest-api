require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const DB_Host = process.env.DB_Host;

const contactsRouter = require("./routes/contactsRouter.js");
const usersRouter = require("./routes/authRouter.js");

const app = express();

app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_Host)
  .then(() => console.log("Database connection successful"))
  .then(
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    })
  )
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
