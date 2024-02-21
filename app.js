const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const config = require("./config/dbconnection.json");
const bodyParser = require("body-parser");
const cors = require("cors");


//-------------------Routes-------------------
const tournamentRouter = require("./routes/tournament");
const teamRouter = require("./routes/team");
const userRouter = require("./routes/user");
const reclamtionRouter = require("./routes/Reclamation");



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
app.use("/user", userRouter);
app.use("/reclamation",reclamtionRouter);
const server = http.createServer(app);
server.listen(3000, console.log("server run"));
module.exports = app;
