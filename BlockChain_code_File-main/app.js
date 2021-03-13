const express=require("express");
const app=express();
const path=require("path");
const cors=require("cors")
const fileUpload=require("express-fileupload");
const PORT=process.env.PORT||5000;
const morgan = require('morgan');
const moment =require("moment");
const Email =require("./models/email");

app.use(morgan('dev'));
const os =require("os");
require("./db/sql");
require('events').EventEmitter.prototype._maxListeners = 150;

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload())

app.use("/",require("./routers/index"))
app.get('/x',(req,res)=>{
	res.send('hello');
})

var url = require('url');

function getFormattedUrl(req) {
    // return url.format({
    //     protocol: req.protocol,
    //     host: req.get('host')
    // });
    return {protocol:req.protocol,host:req.host}
}

// app.get("/getnow",(req,res)=>{
//   console.log(getFormattedUrl(req));
//   res.send(getFormattedUrl(req))
// })


let todayIs=moment().format("YYYY-MM-DD")
const createDate= async()=>{
  
  console.log(todayIs);
  try{
      const date=await Email.findOne({
          where:{send_date:todayIs}
        })
        if(date==null){
            const makeDate=await Email.create({
                send_Date:todayIs
            })
        }     
  }
  catch(e){
      console.log(e);
  }

}
createDate()

app.listen(PORT,()=>{
    console.log(`Connected`,PORT);
})