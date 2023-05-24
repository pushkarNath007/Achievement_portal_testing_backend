const express=require('express');
const mongoose=require('mongoose');
const { userAchievement } = require("../userModel");
const multer=require('multer');
const upload=require('../uAchievmnt_Multer');
const userExists=async(req,res,next)=>{
    try{
    const photo=multer({storage:upload}).single(req.file.fieldname);
    photo(req,res,function(err){
        if (!req.file) res.sendStatus(404);
        else if (err instanceof multer.MulterError) {
          return res.sendStatus(500);
        } else if (err) {
          return res.sendStatus(403);
        }
    })
    }catch(error){
        if(err) console.log("point 3"+error);
    }
    const {achievementTitle}=req.body;
    userAchievement.findOne({ achievementTitle }).exec((err,result)=>{
        if(err) console.log(err);
        if(result) res.status(404).send("Title name already exists");
        
    })
    
}