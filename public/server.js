// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const osc = require("osc");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Carpeta donde está tu web
app.use(express.static(path.join(__dirname, "public")));

// Servidor WebSocket
io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.on("slider", (data) => {
    console.log("Valor recibido del cliente:", data.value);
    udpPort.send({
      address: "/slider",
      args: [{ type: "f", value: data.value }]
    });
  });
});

// Puerto OSC
const udpPort = new osc.UDPPort({
  remoteAddress: "127.0.0.1", // Max en tu máquina
  remotePort: 8000            // Mismo puerto que usarás en [udpreceive 8000]
});
udpPort.open();

// Inicia servidor web
server.listen(3000, () => {
  console.log("Servidor web corriendo en http://localhost:3000");
});
