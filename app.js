const express = require("express");
const compression = require('compression')
const app = express();
app.use(express.json());

const itemRouter = require("./routes/itemRoutes");
const userRouter = require('./routes/userRoutes');

// for compression
app.use(compression())

// routes

app.use("/api/items", itemRouter);
app.use("/api/users", userRouter);

module.exports = app;
