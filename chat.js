const http = require("http")

const express = require("express")
const path = require("path");
const { Server } = require('socket.io');
const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(path.resolve("./public")))

app.get('/', (req,res) => {
    return res.sendFile("./public/index.html")

})

io.on('connection', (socket) => {
    // console.log('a user connected');
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    //   });

    socket.on('user-message', (msg) => {
        console.log('message: ' + msg);
        io.emit('MESSAGE', msg)
      });
  });

  

server.listen(1111, () => console.log(`Server started at PORT:1111`))