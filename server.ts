import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui'
import { Client } from './interfaces/client.interface'

const PORT = process.env.PORT || 3000;

//initialize socket
const io = new Server({ 
  cors: {
    origin: ["https://admin.socket.io","https://angular-clientio.vercel.app"],
    credentials: true,
    methods: ["*"]
  }
})

instrument(io, {
  auth: {
    type: "basic",
    username: "admin",
    password: process.env.ADMIN_UI as string // "changeit" encrypted with bcrypt
  },
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



