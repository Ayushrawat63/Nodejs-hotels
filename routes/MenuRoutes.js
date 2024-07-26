const express= require('express');
const router=express.Router();

const Menu=require('../Model/MenuSchema')

router.get('/',async(req,res)=>{
    try{
        const response= await Menu.find()
        res.status(200).json(response);
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }

})
router.get('/:taste',async(req,res)=>{
    try{
        const tasteType=req.params.taste;
        if(tasteType=="spicy"||tasteType=="sweet"||tasteType=="sour")
        {
            const responseData=await Menu.find({taste:tasteType})
            res.status(200).json(responseData)
        }
        else{
            res.status(404).json({error:"tasteType invalid"})
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
})
router.post('/',async(req,res)=>{
    try{
       const bodyContent=req.body;
      const menuList= new Menu(bodyContent)
       const response= await menuList.save()
       res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
})


module.exports=router