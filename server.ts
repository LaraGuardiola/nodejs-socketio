import express, { Request, Response } from 'express';
import { Server, Socket } from 'socket.io';

const app = express();

const port = 3000;


const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

//initialize socket
const io = new Server(server, { 
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});  

//on connection
io.on('connection', (socket: Socket) => {
  console.log(`${socket.id} has connected`)

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

app.get('/', (req: Request, res: Response) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send("test")
})



