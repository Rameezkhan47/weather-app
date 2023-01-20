const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const BP = require("body-parser")

const app = express();

app.use(cors());
app.use(express.json());
app.use(BP.json())
mongoose
  .connect("mongodb+srv://rameez:rameez@cluster0.cjhb5mh.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/", userRoutes);

app.listen(5000, () => {
  console.log("server started on port 5000");
});