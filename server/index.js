const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const events = require('./events');

const facebook = require('./facebook');

app.get('/hello', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  
  socket.on(events.CONNECT_TO_STREAM, ({videoId, accessToken}) => {
    facebook.setAccessToken(accessToken);
    
    const commentsEmitter = facebook.fetchExistingComments(videoId);

    commentsEmitter.on('comments', (res) => {
      socket.emit(events.SEND_COMMENTS, res);
    });

    commentsEmitter.on('error', (err) => {
      console.error(err);
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});