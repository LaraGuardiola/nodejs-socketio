import { Server, Socket } from 'socket.io';
import { Client } from './interfaces/client.interface'

const PORT = process.env.PORT || 3000;

//initialize socket
const io = new Server({ 
  cors: {
    origin: "https://angular-clientio.vercel.app",
    // origin: "http://localhost:4200",
    // origin: "http://192.168.1.39:4200",
    methods: ["GET", "POST"]
  }
})

//on connection
io.on('connection', async (socket: Socket) => {
  
  console.log(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} // ${socket.id} has connected`)
  
  setInterval(() => {
    setOnlineCount(socket)
  },1000)
  
  //on message
  socket.on("message", (client: Client) => {
    sendMessage(socket, client)
  })

  socket.on("disconnect", () => {
    console.log(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} // ${socket.id} has disconnected`)
  })
})

//sends connected clients
const setOnlineCount = async (socket: Socket) => {
  let clientsCount = await io.engine.clientsCount
  socket.broadcast.emit("onlineCount", clientsCount)
}

const sendMessage = async (socket: Socket, client: Client) => {
  console.log(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} // ${client.name}: ${client.arg}`);
  socket.broadcast.emit("response", client)
}

const server = () => {
  io.listen(PORT as number)
  console.log(`Socket IO started on ${PORT}`)
}

server()



