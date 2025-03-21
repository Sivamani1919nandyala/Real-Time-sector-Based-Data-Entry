const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
console.log("MongoDB URI:", process.env.MONGO_URI);

const sectorRoutes = require("./routes/sectorRoutes");
const entryRoutes = require("./routes/entryRoutes");
const userRoutes = require("./routes/userRoutes");
const exportRoutes = require("./routes/exportRoutes");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/sectors", sectorRoutes);
app.use("/api/entries", entryRoutes);
app.use("/api/users",userRoutes)
app.use("/api", exportRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

// Setup WebSocket for Real-Time Updates
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("new_entry", (data) => {
    io.emit("update_entries", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
