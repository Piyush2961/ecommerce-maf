const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => {
    // console.log(con.connection);
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("DB Connection Error");
  });


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
