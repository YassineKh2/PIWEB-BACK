const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const cors = require("cors")
const ReservationRouter=require("./routes/ReservationR");
const SpRouter=require("./routes/SponsorsR");
const tkRouter=require("./routes/TicketR");

const config = require("./config/dbconnection.json");
const bodyParser = require("body-parser");




//-------------------Routes-------------------
const tournamentRouter = require("./routes/tournament");
const teamRouter = require("./routes/team");

const matchRouter = require("./routes/match");

const userRouter = require("./routes/user");


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
app.use('/public/images', express.static(__dirname + '/public/images/'));


app.use("/tournament", tournamentRouter);
app.use("/reservation",ReservationRouter);
app.use("/sponsors",SpRouter);
app.use("/ticket",tkRouter);

app.use("/team", teamRouter);
app.use("/match", matchRouter);
app.use("/user", userRouter);
const server = http.createServer(app);
server.listen(3000, console.log("server run"));
module.exports = app;
