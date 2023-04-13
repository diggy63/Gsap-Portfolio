const express = require("express");
const logger = require("morgan");
const cors = require("cors");

//loads our .env into our express app
require('dotenv').config()

//configures the database using mongooose
require("./database/conn.js");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

//middleware that check for a token from the client and loades a user into
//our express app
app.use(require("./jwtAuth/auth"));


//our route definitions
app.use("/auth", require("./routes/api/user"));
app.use("/exercise", require("./routes/api/exercise"));






app.listen(port, function () {
  console.log(`Express app listening on port ${port}`);
});