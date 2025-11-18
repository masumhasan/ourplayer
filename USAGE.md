# OurPlayer Usage Guide

## Quick Start

### Starting the Application

1. **Install Dependencies**
```bash
npm install
```

2. **Start the Server**
```bash
npm start
```

3. **Access the Application**
Open your web browser and go to: `http://localhost:3000`

## Using OurPlayer

### Creating a Watch Party

1. **Enter Your Name**
   - Type your name in the "Enter your name" field
   - This will be visible to other users in the room

2. **Create a New Room**
   - Leave the "room code" field empty
   - Click "Join Room"
   - A random room code will be generated (e.g., "V5PLGZ")

3. **Share the Room Code**
   - Copy the room code shown at the top of the screen
   - Share it with friends who want to watch with you

### Joining an Existing Room

1. **Enter Your Name**
   - Type your name in the "Enter your name" field

2. **Enter Room Code**
   - Type or paste the room code shared with you
   - Click "Join Room"

### Loading a Video

1. **Get a Video URL**
   - You need a direct URL to a video file (ending in .mp4, .webm, etc.)
   - Examples of valid URLs:
     - `https://example.com/video.mp4`
     - `https://yourserver.com/media/movie.webm`

2. **Load the Video**
   - Paste the video URL in the "Enter video URL" field
   - Click "Load Video"
   - The video will load for all users in the room

### Watching Together

Once a video is loaded:

- **Play/Pause**: Click the play button to start. Everyone sees the action
- **Seek**: Drag the progress bar to jump to a different time
- **Volume**: Each user controls their own volume
- **Fullscreen**: Click the fullscreen button for immersive viewing

All playback actions (play, pause, seek) are automatically synchronized across all viewers!

### Using Chat

- Type your message in the chat input box at the bottom right
- Press Enter or click "Send"
- Your message appears for all users in the room
- System messages show when users join or leave

### Leaving a Room

- Click the "Leave Room" button at the top right
- Or simply close the browser tab

## Tips and Best Practices

### Video Sources

✅ **Works With:**
- Direct video file URLs (.mp4, .webm, .ogg)
- Self-hosted videos
- Videos on servers with CORS enabled

❌ **Doesn't Work With:**
- YouTube links (future feature)
- Videos behind authentication
- Videos without CORS headers

### Network Requirements

- Stable internet connection recommended
- WebSocket support required (all modern browsers)
- Low latency helps with synchronization

### Browser Support

OurPlayer works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Troubleshooting

**Video Won't Load?**
- Check if the URL is a direct link to a video file
- Verify the video server allows CORS
- Try a different video URL

**Playback Not Syncing?**
- Check your internet connection
- Try refreshing the page
- Ask all users to pause and play again

**Chat Not Working?**
- Check if WebSocket connection is active
- Look for error messages in browser console
- Try rejoining the room

**User Can't Join Room?**
- Verify the room code is correct (case-sensitive)
- Check if the server is running
- Ensure both users can access the server

## Example Session

```
User 1:
1. Opens http://localhost:3000
2. Enters name: "Alice"
3. Leaves room code empty
4. Clicks "Join Room"
5. Gets room code: "ABC123"
6. Shares "ABC123" with Bob
7. Loads video: https://example.com/movie.mp4
8. Clicks play

User 2 (Bob):
1. Opens http://localhost:3000
2. Enters name: "Bob"
3. Enters room code: "ABC123"
4. Clicks "Join Room"
5. Sees the video that Alice loaded
6. Video is already playing at the same position as Alice
7. Can chat with Alice while watching
```

## Advanced Usage

### Running on Different Port

```bash
PORT=8080 npm start
```

### Development Mode with Auto-Reload

```bash
npm run dev
```

### Deploying to Production

See README.md for deployment instructions for:
- Heroku
- Docker
- Other cloud platforms

## Need Help?

- Check the [README.md](README.md) for more details
- Report issues on GitHub
- Join our community discussions
