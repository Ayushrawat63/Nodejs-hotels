const express= require('express')
const app=express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("welcome the resturant sir! ")
})

// router using import
const personRoutes= require('./routes/PersonRoutes')
app.use('/person',personRoutes)

const menuRoutes=require('./routes/MenuRoutes')
app.use('/menu',menuRoutes)


app.listen(3000,()=>{
    console.log("server started")
})