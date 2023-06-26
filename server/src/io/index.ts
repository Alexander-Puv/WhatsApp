import { Server } from "socket.io";

const ioConnection = (io: Server) => {
  io.on('connection', socket => {
    console.log('User connected');
  
    socket.on('newChat', chat => {
      socket.broadcast.emit("newChat", chat);
    })

    socket.on('newGroup', group => {
      socket.broadcast.emit("newGroup", group);
    })

    socket.on('join', group => {
      socket.broadcast.emit("join", group);
    })

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  })
}

export default ioConnection