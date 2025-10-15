import { app } from "./app.js";
import http from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Connect to MongoDB
const connectDB = async () => {
  await mongoose
    .connect(
      // "mongodb+srv://kusuinsta:kusuinsta123@clusterinsta.lmallkd.mongodb.net/instagram"
      "mongodb+srv://kusuinsta:kusuinsta123@clusterinsta.lmallkd.mongodb.net/instagram"
      // { useNewUrlParser: true }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

connectDB();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected : ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(data);
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});
