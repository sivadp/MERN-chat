const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const http = require('http'); // Import the http module
const socketIO = require('socket.io'); // Import socket.io
const httpServer = http.createServer(app); // Create an http server

const io = socketIO(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: ["GET", "POST"],
    credentials: true,
  }
});


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/chatdb', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('accounts', {
  userName: String,
  password: String,
  email: String,
});

// Use the routes module to handle '/signup' route
app.use('/', routes);

// Set up socket.io event handling using the exported function
const setupSocketIO = require('./fetchChatHistoryWithIo'); // Import the function
setupSocketIO(io); // Call the function and pass the io instance

// Start the server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
