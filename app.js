const express = require("express");
const app = express();
app.use(express.json());

const itemRouter = require("./routes/itemRoutes");

// routes

app.use("/api/items", itemRouter);

module.exports = app;
