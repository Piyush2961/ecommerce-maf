const express = require("express");
const compression = require('compression')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const app = express();
app.use(express.json());

app.use(cors())

app.use(fileUpload({
    useTempFiles: true
}))


const itemRouter = require("./routes/itemRoutes");
const userRouter = require('./routes/userRoutes');


// for compression
app.use(compression())

// routes

app.use("/api/items", itemRouter);
app.use("/api/users", userRouter);

module.exports = app;
