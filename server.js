const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require("./routes/api/items");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo connected...."))
  .catch((err) => console.log(err));

//Use Routes

app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
