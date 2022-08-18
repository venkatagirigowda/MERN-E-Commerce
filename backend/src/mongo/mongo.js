const mongoose=require ('mongoose')
const dotenv =require ('dotenv')
dotenv.config()
const DB=process.env.DB_ADDRESS
mongoose.connect(DB).then(()=>{
    console.log("connected to database")}).catch((err)=>{console.log(`failed to connect to database${err.message}`)})


