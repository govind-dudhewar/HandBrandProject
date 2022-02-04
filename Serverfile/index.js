const express=require("express");
const Connection=require("./DB/db")

const app = express();

// 
// const dotenv = require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute = require("./routes/users");
const authRoute =require("./routes/auth");
const postRoute =require("./routes/posts");

const multer = require("multer")
const path= require("path");


//Middleware
app.use("/Images",express.static(path.join(__dirname,"public/Images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/Images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
});

const upload=multer({storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
         return res.status(200).json("File Uploaded Successfully");
    }
    catch(err){
       console.log(err);
    }
})
app.use("/api/users" ,userRoute);
app.use("/api/auth" ,authRoute);
app.use("/api/posts" ,postRoute);



app.listen(8800,()=>console.log("Server is running"));

Connection();










