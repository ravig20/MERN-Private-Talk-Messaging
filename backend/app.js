const express = require('express');
const app = express();
require("dotenv").config({ path: "backend/config/.env" });
const cookieParser = require("cookie-parser");
const cors = require('cors');
const path = require("path");    
app.use(cors());

app.use(express.json({limit:"50mb"}));
app.use(
    express.urlencoded({
        extended: true,
        limit:"50mb",
    })
    );
    
app.use(cookieParser());
    
const usersRoutes = require("./Routers/userRoute");
const chatRoutes = require("./Routers/chatRoutes");
const MessagesRoute = require("./Routers/messageRoutes");
const { wrongUrl, errorHandler } = require('./middleware/errorhandler');

app.use("/api/v1", usersRoutes); 
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", MessagesRoute);


// -------------------------------- deployment --------------------------------

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === "production"){
  console.log("Deployment")
  app.use(express.static(path.join(__dirname1,"/frontend/build")));
  
  app.get("*",(req, res) => {
    res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
  });
  
}else {
  console.log(__dirname1,"what is this");
      console.log("something went wrong in server js file");
      app.get("/", (req,res)=>{
        res.send("api running ")
    });
}

// -------------------------------- deployment --------------------------------

app.use(wrongUrl);
app.use(errorHandler);

module.exports = app;