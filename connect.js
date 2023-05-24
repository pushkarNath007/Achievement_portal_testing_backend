require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${process.env.DB}`);
const connect=mongoose.connection;
connect.on("connected",()=>{
    console.log("connected");
});
connect.on("disconnect",()=>{
    console.log("disconnected");
})
connect.on("error",()=>{
    console.error.bind(console,"Error occured couldnt connected");
})