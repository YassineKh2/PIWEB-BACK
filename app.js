const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const cors = require("cors")
const tournamentRouter = require("./routes/tournament");
const ReservationRouter=require("./routes/ReservationR");
const SpRouter=require("./routes/SponsorsR");

const config = require("./config/dbconnection.json");
const bodyParser = require("body-parser");
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
app.use("/reservation",ReservationRouter);
app.use("/sponsors",SpRouter);

const server = http.createServer(app);
server.listen(3000, console.log("server run"));
module.exports = app;
