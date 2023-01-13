import { Server, Socket } from 'socket.io';

const PORT = process.env.PORT || 3000;

//initialize socket
const io = new Server({ 
  cors: {
    origin: ["https://angular-clientio.vercel.app/", "http://localhost:4200"],
    methods: ["GET", "POST"]
  }
})

//on connection
io.on('connection', (socket: Socket) => {
  console.log(`${socket.id} has connected - ${new Date()}`)

  //on message
  socket.on("message", (arg: string) => {
    console.log(arg);
    socket.broadcast.emit("response", arg)
  });
})

const server = () => {
  io.listen(PORT as number)
  console.log(`Socket IO started on ${PORT}`)
}

server()



