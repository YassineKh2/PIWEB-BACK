const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const config = require("./config/dbconnection.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const path=require("path");

//-------------------Routes-------------------
const tournamentRouter = require("./routes/tournament");
const teamRouter = require("./routes/team");
const userRouter = require("./routes/user");
const reclamtionRouter = require("./routes/Reclamation");
const avisRouter = require("./routes/avis");
const reservationRouter=require("./routes/ReservationR");
const ticketrouter = require("./routes/TicketR");


mongo
  .connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Not Connected"));

var app = express();
app.set("views",path.join(__dirname,"views"));
app.set("view engine","twig");
app.use(cors({
  origin: '*',  // Replace with your React app's origin
  credentials: true,  // If your requests include credentials like cookies
}));
app.use(bodyParser.json());
app.use("/tournament", tournamentRouter);
app.use("/team", teamRouter);
app.use("/user", userRouter);
app.use("/reclamation",reclamtionRouter);
app.use("/avis",avisRouter);
app.use("/reservation",reservationRouter);
app.use("/ticket",ticketrouter);
const server = http.createServer(app);
server.listen(3000, console.log("server run"));
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust this based on your React app's origin
    methods: ["GET", "POST", "PUT"],
  },
});
io.on("connection", (socket) => {
  console.log("User connected");

  // Handle score update event
  socket.on("updateScore", (updatedMatch) => {
    // Broadcast the updated match to all connected clients
    io.emit("updateScore", updatedMatch);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
})
module.exports = app;
