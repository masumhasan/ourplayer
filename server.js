const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Room state management
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room
  socket.on('join-room', (roomId, username) => {
    socket.join(roomId);
    socket.username = username;
    socket.roomId = roomId;

    // Initialize room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        videoState: {
          isPlaying: false,
          currentTime: 0,
          videoUrl: ''
        },
        users: []
      });
    }

    const room = rooms.get(roomId);
    room.users.push({ id: socket.id, username });

    // Send current room state to the new user
    socket.emit('room-state', room.videoState);

    // Notify others in the room
    socket.to(roomId).emit('user-joined', { username, userId: socket.id });
    
    // Send updated user list to all users in the room
    io.to(roomId).emit('user-list', room.users);

    console.log(`${username} joined room ${roomId}`);
  });

  // Handle video URL change
  socket.on('change-video', ({ roomId, videoUrl }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.videoState.videoUrl = videoUrl;
      room.videoState.currentTime = 0;
      room.videoState.isPlaying = false;
      socket.to(roomId).emit('video-changed', { videoUrl });
    }
  });

  // Handle play event
  socket.on('play', ({ roomId, currentTime }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.videoState.isPlaying = true;
      room.videoState.currentTime = currentTime;
      socket.to(roomId).emit('play', { currentTime });
    }
  });

  // Handle pause event
  socket.on('pause', ({ roomId, currentTime }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.videoState.isPlaying = false;
      room.videoState.currentTime = currentTime;
      socket.to(roomId).emit('pause', { currentTime });
    }
  });

  // Handle seek event
  socket.on('seek', ({ roomId, currentTime }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.videoState.currentTime = currentTime;
      socket.to(roomId).emit('seek', { currentTime });
    }
  });

  // Handle chat message
  socket.on('chat-message', ({ roomId, message }) => {
    io.to(roomId).emit('chat-message', {
      username: socket.username,
      message,
      timestamp: new Date().toISOString()
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const roomId = socket.roomId;
    if (roomId && rooms.has(roomId)) {
      const room = rooms.get(roomId);
      room.users = room.users.filter(user => user.id !== socket.id);

      if (room.users.length === 0) {
        rooms.delete(roomId);
        console.log(`Room ${roomId} deleted (empty)`);
      } else {
        io.to(roomId).emit('user-left', { username: socket.username, userId: socket.id });
        io.to(roomId).emit('user-list', room.users);
      }
    }
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
