// isse if bhot long path h to is packge is issi hota h
require('module-alias/register')

require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
const passport = require('./config') // Import configured passport
const session = require('express-session');
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);
// for setup ejs page
app.set("view engine", "ejs");


// export app and io for use other module
module.exports = { io, app };

// socket.io to connection handler
// io ka use real time m back end bhej k result magana rhta h
io.on("connection", (socket) => {
    console.info("A cilent connection")
})
// import the routs
const routes = require("./routes");
// inilize the database connection
require("@lib/db");

// import custom middleware to check connection
const {checkDBConnection} =require("@lib/middlewares");

//  import the channels isme channel s ralted sari information hogi
const channel=require("@models/Channel")

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
   
  }))
// initialize the passport for authentication
  app.use(passport.initialize());
  // Enable persistent login sessions
  app.use(passport.session());

//    connect to dabase
app.use(checkDBConnection);
// for from of data
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// static files for useage
app.use(express.static(path.join(__dirname, "public")));
// setup session with secret key
app.use(session({
  secret:"secret",
  resave:false,
  saveUninitialized:false,
}));
// passport intialize to authencication
app.use(passport.initialize());
// enable presistent login session
app.use(passport.session());
// to check database connection
app.use(checkDBConnection());

app.use( async (req,res,next) =>{
  res.locals.isCreateChannel =flase;
  // if user loggedin
  if(req.user){
    res.locals.channel=req.channel=req.user;

  }
  // not logged in
  else {
    req.channel=res.locals=null;
  }
  next();

})

// application routes
app.use("/",checkDBConnection,"routes");


app.get( (req, res)=> {
    res.status(404).render("404");

  })
    const port=3000;
    server.listen(port,()=>{
console.info(`server started at http://localhost${port}`)
    })
