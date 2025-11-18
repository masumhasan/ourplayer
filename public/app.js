// Initialize socket connection
const socket = io();

// DOM elements
const joinScreen = document.getElementById('join-screen');
const playerScreen = document.getElementById('player-screen');
const usernameInput = document.getElementById('username-input');
const roomInput = document.getElementById('room-input');
const joinBtn = document.getElementById('join-btn');
const leaveBtn = document.getElementById('leave-btn');
const roomCodeSpan = document.getElementById('room-code');
const videoPlayer = document.getElementById('video-player');
const videoSource = document.getElementById('video-source');
const videoUrlInput = document.getElementById('video-url-input');
const loadVideoBtn = document.getElementById('load-video-btn');
const noVideoMessage = document.getElementById('no-video-message');
const userList = document.getElementById('user-list');
const userCount = document.getElementById('user-count');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');

// State
let currentRoom = null;
let currentUsername = null;
let isUpdatingFromRemote = false;

// Generate random room code
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Join room
joinBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const roomId = roomInput.value.trim() || generateRoomCode();

    if (!username) {
        alert('Please enter your name');
        return;
    }

    currentUsername = username;
    currentRoom = roomId;

    socket.emit('join-room', roomId, username);
    roomCodeSpan.textContent = roomId;

    joinScreen.classList.remove('active');
    playerScreen.classList.add('active');
});

// Leave room
leaveBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to leave the room?')) {
        location.reload();
    }
});

// Load video
loadVideoBtn.addEventListener('click', () => {
    const videoUrl = videoUrlInput.value.trim();
    
    if (!videoUrl) {
        alert('Please enter a video URL');
        return;
    }

    socket.emit('change-video', { roomId: currentRoom, videoUrl });
    loadVideo(videoUrl);
});

function loadVideo(url) {
    videoSource.src = url;
    videoPlayer.load();
    videoPlayer.classList.add('active');
    noVideoMessage.style.display = 'none';
    videoUrlInput.value = url;
}

// Video player events
videoPlayer.addEventListener('play', () => {
    if (!isUpdatingFromRemote) {
        socket.emit('play', { roomId: currentRoom, currentTime: videoPlayer.currentTime });
    }
});

videoPlayer.addEventListener('pause', () => {
    if (!isUpdatingFromRemote) {
        socket.emit('pause', { roomId: currentRoom, currentTime: videoPlayer.currentTime });
    }
});

videoPlayer.addEventListener('seeked', () => {
    if (!isUpdatingFromRemote) {
        socket.emit('seek', { roomId: currentRoom, currentTime: videoPlayer.currentTime });
    }
});

// Socket events
socket.on('room-state', (videoState) => {
    if (videoState.videoUrl) {
        loadVideo(videoState.videoUrl);
        isUpdatingFromRemote = true;
        videoPlayer.currentTime = videoState.currentTime;
        if (videoState.isPlaying) {
            videoPlayer.play();
        }
        isUpdatingFromRemote = false;
    }
});

socket.on('video-changed', ({ videoUrl }) => {
    loadVideo(videoUrl);
    addSystemMessage(`Video changed`);
});

socket.on('play', ({ currentTime }) => {
    isUpdatingFromRemote = true;
    videoPlayer.currentTime = currentTime;
    videoPlayer.play();
    isUpdatingFromRemote = false;
});

socket.on('pause', ({ currentTime }) => {
    isUpdatingFromRemote = true;
    videoPlayer.currentTime = currentTime;
    videoPlayer.pause();
    isUpdatingFromRemote = false;
});

socket.on('seek', ({ currentTime }) => {
    isUpdatingFromRemote = true;
    videoPlayer.currentTime = currentTime;
    isUpdatingFromRemote = false;
});

socket.on('user-joined', ({ username }) => {
    addSystemMessage(`${username} joined the room`);
});

socket.on('user-left', ({ username }) => {
    addSystemMessage(`${username} left the room`);
});

socket.on('user-list', (users) => {
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.username + (user.id === socket.id ? ' (you)' : '');
        userList.appendChild(li);
    });
    userCount.textContent = users.length;
});

// Chat functionality
sendChatBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    socket.emit('chat-message', { roomId: currentRoom, message });
    chatInput.value = '';
}

socket.on('chat-message', ({ username, message, timestamp }) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    
    const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div><span class="username">${username}:</span>${message}</div>
        <span class="timestamp">${time}</span>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

function addSystemMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    messageDiv.style.background = '#f0f0f0';
    messageDiv.style.fontStyle = 'italic';
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div>🔔 ${message}</div>
        <span class="timestamp">${time}</span>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
