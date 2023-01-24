const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const BP = require("body-parser")
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(BP.json())




mongoose
  .connect("mongodb://localhost:27017/weatherApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGOOSE CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("MONGOOSE CONNECTION ERROR!!!!");
    console.log(err);
  });

app.use("/", userRoutes);

app.listen(5000, () => {
  console.log("server started on port 5000");
});