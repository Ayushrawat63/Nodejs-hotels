const express= require('express')
const router=express.Router()
const AllUser=require('../Model/UserSchema')

const {VerifyTokenMiddlerware,GenerateToken}=require('../JWTauth')

router.get('/',VerifyTokenMiddlerware, async(req,res)=>{
    try{
  const userData=await AllUser.find()
    res.status(200).json(userData)
    } 
    catch(err){
       res.status(500).json({status:"internal server error"})
    }
})

router.get('/profile',VerifyTokenMiddlerware,async (req,res)=>{
    try{
        const userPlayload=req.payload;
        console.log(userPlayload);
        const user = await AllUser.findById({_id:userPlayload.id})
           res.status(201).json(user)
    }
    catch(error)
   {
       console.log("Internal server error",error)
       res.status(500).json({status:"internal server error"})
   }
})

router.post('/signin', async (req,res)=>{
   try{
   const val=req.body;
   const user= new AllUser(val)
   const userData= await user.save()
   console.log("data added to database")
   const payload={
    username:userData.username,
    id:userData._id
   }
   const token=GenerateToken(payload)
   res.status(200).json({content:userData,token:token})
   }
   catch(error)
   {
       console.log("Internal server error",error)
       res.status(500).json({status:"internal server error"})
   }
}
)

//user Login in post request

router.post('/login',async(req,res)=>{
    try{
      const {username,password}=req.body
      const user=await AllUser.findOne({username:username})
      if(!user) return res.status(401).json({error:"Username is not vaild"})
        console.log(user);
       await user.comparePassword(password,function(err, isMatch) {
        if (err) throw err;
        console.log(password, isMatch);
        if(!isMatch)  return  res.status(401).json({error:"Password is not vaild"})
            // generate token
          const payload={
            id:user.id,
            username:user.username
          }
          const token=GenerateToken(payload)
            return  res.status(201).json({status:"Successfu; login ",token})

    });
      
    }
    catch(err){
        console.log("Internal server error",err)
       res.status(500).json({status:"internal server error"})

    }
})

router.get('/:worktype',async(req,res)=>{
   try{
       
   const workType=req.params.worktype;
   if(workType=='chef'|| workType=="manager"|| workType=="waiter")
   {
       const response= await AllUser.find({work:workType})
       res.status(200).json(response)
   }
   else{
       res.status(404).json({error:"worktype invalid"})
   }
   }
   catch(err){
       console.log(err)
       res.status(500).json({error:"Internal server error"})

   }

})
router.put('/:id',async(req,res)=>{
    try{
        const id =req.params.id
        const bodyData=req.body;
       const responseData= await AllUser.findByIdAndUpdate(id,bodyData,{
        new:true,
        runValidators:true
       })
       if(!responseData) res.status(404).json({error:"Person not found"})
       console.log(responseData)
       res.status(200).json(responseData)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const id =req.params.id;
         const response=await AllUser.findByIdAndDelete(id)
         if(!response) res.status(404).json({error:"Person not found"})
         console.log("user deleted")
       res.status(200).json(response)

    }
    catch{
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
})


module.exports= router