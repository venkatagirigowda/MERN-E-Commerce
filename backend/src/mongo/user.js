const mongoose=require ('mongoose')
const bcrypt =require ('bcryptjs')
const jwt=require ('jsonwebtoken')
const Users=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
   
})

Users.pre('save',async function (next){
 try{
  const salt=await bcrypt.genSalt(10)
  const hashpassword=await bcrypt.hash(this.password,salt)
  const hashcpassword=await bcrypt.hash(this.cpassword,salt)
  this.password=hashpassword
  this.cpassword=hashcpassword
  next()
 }
 catch (error){
    next(error)
 }
})
const users=new mongoose.model("UUser",Users)
module.exports=users