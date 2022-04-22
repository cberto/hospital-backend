require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

//server express

const app = express();

app.use(cors());

dbConnection();

app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hello",
  });
});

app.listen(process.env.PORT, () => {
  console.log("El servidor esta corriendo en el puerto " + process.env.PORT);
});

//WPHDwoWdkq7Qg6ga
//mean_user2
