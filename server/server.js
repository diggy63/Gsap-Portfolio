const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require('dotenv').config()

require("./database/conn.js");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.use(require("./jwtAuth/auth"));

app.use("/auth", require("./routes/api/user"));
app.use("/test", require("./routes/api/test"));






app.listen(port, function () {
  console.log(`Express app listening on port ${port}`);
});