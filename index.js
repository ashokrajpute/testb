import 'dotenv/config'
import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from  "cors";
import cookieParser from 'cookie-parser';
 var app=express();
// app.use(cors);
// var corsOptions = {
//   origin: 'https://ashokmernmovie.netlify.app',
//   optionsSuccessStatus: 200 // For legacy browser support
// }
// app.use(cors({
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 ,// For legacy browser support
//   credentials: true,
// }));
app.use(cors({ origin: 'https://testf-rwui.onrender.com', credentials:true ,exposedHeaders: ["set-cookie"] }));
//app.use(cors({ origin: 'http://localhost:3000', credentials:true ,exposedHeaders: ["set-cookie"] })) 
app.use(cookieParser());
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   //res.header('Access-Control-Allow-Credentials', true);
//   //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
 app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect(process.env.DATABASE);
var userschema=mongoose.Schema({
  username:String,
  password:String,
  // googleId:String,
  fav:[ {adult: String,
    backdrop_path: String,
    genre_ids: [],
    id: Number,
    original_language: String,
    original_title: String,
    overview: String,
  popularity: Number,
  poster_path: String,
    release_date: String,
      title: String,
        video: String,
          vote_average: Number,
            vote_count: Number
}]
})


var userModel=mongoose.model('movie',userschema);

app.post('/login',async (req,res)=>{
//console.log(req.body);
// var b=new userModel({
//     username:"xyz1@gmail.com",
//     password:"99999999"
// });
// await b.save();
// res.send('yes');
console.log(req.body);
var t=await userModel.find({username:req.body.useremail,password:req.body.password});
console.log(t);
if(t.length!=0){
    
      res.cookie('ashokcookies', t[0]).send('login');
}
else{
    res.send("notlogined");
}

})

// passport.use(new GoogleStrategy({
//   clientID: clientid,
//   clientSecret: clientsecret,
//   callbackURL: "http://localhost:5000"
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }

// ));
// passport.use(userModel.createStrategy());
// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     cb(null, { id: user.id, username: user.username });
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });


// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/', 
//   passport.authenticate('google', { failureRedirect: '/error' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.send("u r logined");
//   });

app.get("/",(req,res)=>{
  //console.log("hello");
res.send("hellotest");
});
// //======

// app.post('/isauthenticated',async (req,res)=>{
//   var {u,e}=req.body;
//   //console.log(u,e);
//   try{
//  var d=await userModel.find({_id:u,username:e});
//  if(d){
//   //console.log("==",d);
//   d=JSON.stringify(d);
//   //console.log("===",d);
//   res.send(d);
//  }else{
// res.send('unvalid');}
//  }
//  catch(err){
//   res.send(err);
//  }
// })

// //


// app.post("/register",async (req,res)=>{
  
// var {useremail,userpassword:pass}=req.body;

// try{
// var v=await userModel.find({email:req.body.useremail});

// if(v.length==0){
//    var newuser={
//     email:useremail,
//     password:pass
//    }
// await userModel.create(newuser);
// res.send("Registered");
// }
// else{
//   res.send("NotRegistered");
// }

// }
// catch(err){
//   res.send("NotRegistered");
// }

// });
//===
// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: "/error" }),
//   function(req, res) {
//    // console.log(req.user);
//     var d={
//       u:req.user._id,
//       e:req.user.username
//     }
//     res.cookie("ashokcookies",d,{ maxAge: 900000, httpOnly: true });
//     res.send("u r login");
//   });
// app.post("/login",async (req,res)=>{
//   console.log("login");
// var {useremail,userpassword:pass}=req.body;
//  console.log(useremail+" "+pass);
// try{
//   var v=await userModel.find({username:useremail,password:pass});
//   console.log(v);
//  if(v.length==0){console.log("1");res.send("Unable to login");}
//  else{
//   passport.authenticate('local', { failureRedirect: '/error' }),
//    function(req, res) {
//     console.log("2")
//   res.send("u r login");
//  };}

// }
// catch(err){
//   console.log(err);
//   res.send("Unable to login");
// }
// });
//===






var portavailable=process.env.PORT||5000;
 app.listen(portavailable,()=>{
  console.log("server started 5000");
 })
 