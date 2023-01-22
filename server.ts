import { Server, Socket } from 'socket.io';

const PORT = process.env.PORT || 3000;

//initialize socket
const io = new Server({ 
  cors: {
    // origin: "https://angular-clientio.vercel.app",
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
})

//on connection
io.on('connection', async (socket: Socket) => {
  
  console.log(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${socket.id} has connected`)
  
  setInterval(() => {
    setOnlineCount(socket)
  },1000)
  
  //on message
  socket.on("message", (arg: string) => {
    sendMessage(socket, arg)
  });
})

//sends connected clients
const setOnlineCount = async (socket: Socket) => {
  let clientsCount = await io.engine.clientsCount
  socket.broadcast.emit("onlineCount", clientsCount)
}

const sendMessage = async (socket: Socket, arg: string) => {
  console.log(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: ${arg}`);
  socket.broadcast.emit("response", arg)
}

const server = () => {
  io.listen(PORT as number)
  console.log(`Socket IO started on ${PORT}`)
}

server()



