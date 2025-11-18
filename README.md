# OurPlayer - Watch Together 🎬

A real-time video synchronization platform that allows multiple users to watch videos together in perfect sync.

## Features

- 🎥 **Synchronized Video Playback**: All viewers watch the same video at the same time
- ⏯️ **Real-time Controls**: Play, pause, and seek controls synchronized across all users
- 💬 **Live Chat**: Chat with other viewers while watching
- 🚪 **Room-based System**: Create or join rooms with simple room codes
- 👥 **User Presence**: See who's watching with you
- 🌐 **Web-based**: No installation required, works in any modern browser

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/masumhasan/ourplaye.git
cd ourplaye
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Development Mode

For development with auto-reload:
```bash
npm run dev
```

## Usage

1. **Join a Room**:
   - Enter your name
   - Either enter an existing room code or leave blank to create a new room
   - Click "Join Room"

2. **Load a Video**:
   - Enter a video URL (must be a direct link to .mp4, .webm, or other supported formats)
   - Click "Load Video"

3. **Watch Together**:
   - Use the video player controls (play, pause, seek)
   - All actions are synchronized with other viewers in the room
   - Chat with others in the sidebar

4. **Share the Room**:
   - Share the room code displayed at the top with friends
   - They can enter it when joining to watch together

## How It Works

OurPlayer uses WebSocket technology (Socket.io) to maintain real-time synchronization between all viewers in a room:

- When a user performs an action (play, pause, seek), it's broadcast to all other users
- The server maintains the current state of each room
- New users joining a room automatically sync to the current video state
- Chat messages are delivered in real-time to all room participants

## Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.io
- **Video Player**: HTML5 Video API

## Architecture

```
ourplaye/
├── server.js           # Express + Socket.io server
├── package.json        # Project dependencies
├── public/
│   ├── index.html     # Main HTML page
│   ├── styles.css     # Styling
│   └── app.js         # Client-side JavaScript
└── README.md          # This file
```

## Supported Video Formats

OurPlayer supports any video format that the HTML5 video element supports, including:
- MP4 (.mp4)
- WebM (.webm)
- Ogg (.ogg)

Note: Videos must be hosted on a publicly accessible URL with CORS enabled.

## Deployment

### Heroku

1. Create a new Heroku app
2. Push the code to Heroku
3. The app will automatically start with `npm start`

### Docker

```bash
# Build the image
docker build -t ourplayer .

# Run the container
docker run -p 3000:3000 ourplayer
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Future Enhancements

- [ ] YouTube video support
- [ ] Video playlist functionality
- [ ] User authentication
- [ ] Persistent room history
- [ ] Video quality selection
- [ ] Mobile app version
- [ ] Screen sharing capability
- [ ] Reactions and emojis
- [ ] Room passwords/privacy settings

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
