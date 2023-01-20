import { Server, Socket } from 'socket.io';

const PORT = process.env.PORT || 3000;

//initialize socket
const io = new Server({ 
  cors: {
    origin: "https://angular-clientio.vercel.app",
    // origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
})

//on connection
io.on('connection', (socket: Socket) => {
  console.log(`${socket.id} has connected - ${new Date()}`)
  setOnlineCount(socket)

  //on message
  socket.on("message", (arg: string) => {
    console.log(`${new Date()}: ${arg}`);
    socket.broadcast.emit("response", arg)
  });
})

//sends connected clients
const setOnlineCount = (socket: Socket) => {
  setInterval(() => {
    socket.broadcast.emit("onlineCount", io.engine.clientsCount)
  }, 1000)
}

const server = () => {
  io.listen(PORT as number)
  console.log(`Socket IO started on ${PORT}`)
}

server()



