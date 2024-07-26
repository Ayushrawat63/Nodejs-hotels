const express= require('express')
const router=express.Router()
const AllUser=require('../Model/UserSchema')

router.get('/', async(req,res)=>{
    try{
  const userData=await AllUser.find()
    res.status(200).json(userData)
    } 
    catch(err){
       res.status(500).json({status:"internal server error"})
    }
})

router.post('/', async (req,res)=>{
   try{
   const val=req.body;
   const user= new AllUser(val)
   const userData= await user.save()
   console.log("data added to database")
   res.status(200).json(userData)

   }
   catch(error){
       console.log("Internal server error",error)
       res.status(500).json({status:"internal server error"})

   }
}
)

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