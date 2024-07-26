const express= require('express')
const app=express()
app.use(express.json())
require('dotenv').config()
const Port=process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.send("welcome the resturant sir! ")
})

// router using import
const personRoutes= require('./routes/PersonRoutes')
app.use('/person',personRoutes)

const menuRoutes=require('./routes/MenuRoutes')
app.use('/menu',menuRoutes)



app.listen(Port,()=>{
    console.log("server started")
})