import { Server, Socket } from 'socket.io';

const PORT = process.env.PORT || 3000;

//initialize socket
const io = new Server({ 
  cors: {
    origin: "*",
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

  //on input message
  socket.on("inputMessage", (length: number) => {
    if(length > 0){
      console.log(`${socket.id} is writing...`)
    }
  });

})

const server = () => {
  io.listen(PORT as number)
  console.log(`Socket IO started on ${PORT}`)
}

server()



