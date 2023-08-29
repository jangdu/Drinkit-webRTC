const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

app.use(
  cors({
    origin: 'http://localhost:3200', // 프론트엔드 서버 주소
    credentials: true,
  }),
);
const PORT = process.env.PORT || 8080;

let users = {};

let socketToRoom = {};

const maximum = process.env.MAXIMUM || 4;

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    if (users[data.room]) {
      const length = users[data.room].length;
      if (length === maximum) {
        socket.to(socket.id).emit('room_full');
        return;
      }
      users[data.room].push({ id: socket.id, email: data.email });
    } else {
      users[data.room] = [{ id: socket.id, email: data.email }];
    }
    socketToRoom[socket.id] = data.room;

    socket.join(data.room);
    console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

    const usersInThisRoom = users[data.room].filter(
      (user) => user.id !== socket.id,
    );

    console.log('rooms: ', usersInThisRoom);

    io.sockets.to(socket.id).emit('all_users', usersInThisRoom);
  });

  socket.on('offer', (data) => {
    //console.log(data.sdp);
    socket.to(data.offerReceiveID).emit('getOffer', {
      sdp: data.sdp,
      offerSendID: data.offerSendID,
      offerSendEmail: data.offerSendEmail,
    });
  });

  socket.on('answer', (data) => {
    //console.log(data.sdp);
    socket
      .to(data.answerReceiveID)
      .emit('getAnswer', { sdp: data.sdp, answerSendID: data.answerSendID });
  });

  socket.on('candidate', (data) => {
    socket.to(data.candidateReceiveID).emit('getCandidate', {
      candidate: data.candidate,
      candidateSendID: data.candidateSendID,
    });
  });

  socket.on('get_room_list', () => {
    const roomList = Object.keys(users);
    socket.emit('room_list', roomList);
  });

  socket.on('disconnect', () => {
    console.log(`[${socketToRoom[socket.id]}]: ${socket.id} exit`);
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((user) => user.id !== socket.id);
      users[roomID] = room;
      if (room.length === 0) {
        delete users[roomID];
        return;
      }
    }
    socket.to(roomID).emit('user_exit', { id: socket.id });
    console.log(users);
  });
});

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
