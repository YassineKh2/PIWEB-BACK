const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const config = require("./config/dbconnection.json");
const bodyParser = require("body-parser");
<<<<<<< HEAD
const cors = require("cors");
=======


//-------------------Routes-------------------
const tournamentRouter = require("./routes/tournament");
const teamRouter = require("./routes/team");



>>>>>>> ae8c7375c99ec6f7ad0f7f6ba7c0736fdea4214a
mongo
  .connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Not Connected"));

var app = express();
app.use(cors({
  origin: '*',  // Replace with your React app's origin
  credentials: true,  // If your requests include credentials like cookies
}));
app.use(bodyParser.json());
app.use("/tournament", tournamentRouter);
app.use("/team", teamRouter);

const server = http.createServer(app);
server.listen(3000, console.log("server run"));
module.exports = app;
