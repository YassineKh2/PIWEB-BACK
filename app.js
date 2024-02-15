const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const config = require("./config/dbconnection.json");
const bodyParser = require("body-parser");


//-------------------Routes-------------------
const tournamentRouter = require("./routes/tournament");
const teamRouter = require("./routes/team");



mongo
  .connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Not Connected"));

var app = express();

app.use(bodyParser.json());
app.use("/tournament", tournamentRouter);
app.use("/team", teamRouter);

const server = http.createServer(app);
server.listen(3000, console.log("server run"));
module.exports = app;
