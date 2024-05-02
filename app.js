const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const cors = require("cors");
const ReservationRouter = require("./routes/ReservationR");
const SpRouter = require("./routes/SponsorsR");
const tkRouter = require("./routes/TicketR");
const paymentRoutes = require("./routes/payment");
const config = require("./config/dbconnection.json");
const bodyParser = require("body-parser");
const nlp = require('compromise');

const StadiumController = require("./controllers/stadiumController"); // Import your stadium controller
require('dotenv').config();

//-------------------Routes-------------------
const tournamentRouter = require("./routes/tournament");
const teamRouter = require("./routes/team");
const matchRouter = require("./routes/match");
const geminiRouter= require("./routes/SyGenieR")
const userRouter = require("./routes/user");
const hotelRouter = require("./routes/hotel");
const stadiumRouter = require("./routes/stadium");

const goalRouter = require("./routes/goal");
const matchStatRouter = require("./routes/matchStat");
const path = require("path");
const {addChatMessage} = require("./controllers/chatmessageController");

mongo
  .connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Not Connected"));

var app = express();
app.use(
  cors({
    origin: "*", // Replace with your React app's origin
    credentials: true, // If your requests include credentials like cookies
  })
);
app.use(bodyParser.json());
app.use("/public/images", express.static(__dirname + "/public/images/"));

app.use("/tournament", tournamentRouter);
app.use("/reservation", ReservationRouter);
app.use("/sponsors", SpRouter);
app.use("/ticket", tkRouter);
app.use("/payment", paymentRoutes);

app.use("/team", teamRouter);
app.use("/match", matchRouter);
app.use("/user", userRouter);
app.use("/hotel", hotelRouter);
app.use("/stadium", stadiumRouter);
app.get('/api/chatbot/initial', (req, res) => {
  const initialMessage = "Bonjour! Que souhaitez-vous faire sur la plateforme LinkUpTournament?";
  res.json({ response: initialMessage });
});
// Route pour le traitement des messages du chatbot
app.post('/api/chatbot', (req, res) => {
  const userMessage = req.body.message;
  const botResponse = processChatMessage(userMessage);
  res.json({ response: botResponse });
});
app.use("/goal", goalRouter);
app.use("/matchStat", matchStatRouter);
app.use("/gem",geminiRouter);
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust this based on your React app's origin
    methods: ["GET", "POST", "PUT"],
  },
});
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("updateScore", (updatedMatch) => {
    io.emit("updateScore", updatedMatch);
  });
  socket.on("updateTournamentStats", (saveClicked, tournamentId) => {
    io.emit("updateTournamentStats", saveClicked, tournamentId);
  });
 
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  StadiumController.updateStadiumStatus()
  .then(() => console.log("Stadium statuses updated on server start"))
  .catch((error) => console.error("Error updating stadium statuses:", error));

  socket.on("message",(data)=>{
    addChatMessage(data).then(r => console.log("message added"+r))
    io.emit("message",data)
  })

});

const processChatMessage = (message) => {
  try {
    console.log("Received message:", message);

    if (!message || typeof message !== 'string') {
      throw new Error("Invalid message format");
    }

    // Créez une instance complète de Compromise et normalisez le texte
    const doc = nlp(message).normalize().out('text');

    console.log("Doc:", doc);

    // Exemple : générez une réponse basée sur les entités extraites
    const response = generateResponse(doc);

    return response;
  } catch (error) {
    console.error('Error processing message:', error);
    return "Error processing message";
  }
};

// Fonction de génération de réponse basée sur le texte
const generateResponse = (text) => {
  console.log("Text received:", text);

  const lowerText = text.toLowerCase().trim();
  if (/qu'est-ce que linkuptournament|linkuptournament/i.test(lowerText)) {
    return "LinkUpTournament est une plateforme en ligne pour organiser des tournois.";
  } else if (/comment faire une reservation pour un match|reservation match/i.test(lowerText)) {
    return "Pour faire une réservation pour un match, accédez au tournoi, choisissez le tournoi désiré, cliquez sur 'Détails' et vous trouverez l'option pour réserver.";
  } else if (/comment saisir un avis sur un match|avis match/i.test(lowerText)) {
    return "Pour saisir un avis sur un match, accédez au tournoi, choisissez le tournoi désiré, cliquez sur 'Détails' et vous pourrez saisir votre avis.";
  } else if (/comment voir tous les tournois disponibles|tournois disponibles/i.test(lowerText)) {
    return "Pour voir tous les tournois disponibles, accédez à la section des tournois dans la barre de navigation.";
  } else {
    // Réponse par défaut
    return "Merci pour votre message. Comment puis-je vous assister aujourd'hui ?";
  }
};


server.listen(3000, console.log("server run"));
module.exports = app;
