const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

const Log = require("./model/Log");

app.get("/", async (req, res) => {
  const logs = await Log.find();
  res.render("Home", { test: process.env.TEST, logs });
});

app.post("/create", async (req, res) => {
  await Log.create({
    message: req.body.log,
  });
  res.redirect("/");
});

app.post("/delete/:msg", async (req, res) => {
  const msg = req.params.msg;
  console.log(msg);
  await Log.deleteOne({ message: msg });
  res.redirect("/");
});

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5001;

app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      directConnection: true,
      replicaSet: "rs0",
      readPreference: "nearest",
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
});
