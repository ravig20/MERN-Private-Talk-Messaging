const app = require("./app");
const { connectDatabase } = require("./config/database");
       
const cloudinary = require("cloudinary");
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connection established to socket.io");
  // create a new socket frontend will send some data to join a room
  socket.on("setup", (userData) => {
    // create a room
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected");
  });
  // joining a chat
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("joined chat room", room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing")); 
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing")); 


  socket.on("new message", (newMessageReceived) => {
    // console.log(newMessageReceived, "message received by frontend");

    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.user not found");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;  // filter out me or return recever id;
  
      socket.in(user._id).emit("message received", newMessageReceived);

    });
  });
  socket.off("setup", ()=>{
    console.log("user disconnected");
    socket.leave(userData._id);
  })

});




