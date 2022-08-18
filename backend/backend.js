const express=require ('express')
const cors=require ('cors')
const cookieparser=require ('cookie-parser')
const app=express()


require ('./src/mongo/mongo.js')
const route=require ('./src/route/productRoute')
app.use(cors({
  origin:["http://localhost:3000"],
  credentials:true
}))
app.use(express.json())
app.use(cookieparser())
app.use(route)

const port=process.env.PORT || 5000
app.listen(port,()=>{
  console.log("listening on port 5000")
})
