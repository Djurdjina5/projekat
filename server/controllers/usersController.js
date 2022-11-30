const mongoose = require("mongoose");
const e = require("express");
const User = mongoose.model('user');

module.exports.login = function(req,res){
    console.log(req.body);
    console.log("in login");

    User.findOne({username:req.body.username}).then(
        user=>{
          if(user){
            if(user.password!=req.body.password){
                res.status(401).json('Pogresna lozinka')
                } else {
                    User.findOneAndUpdate({username:req.body.username},{$set: { isActive: true}},function(err, data){
                  })
                    user.isActive = true;
                    res.status(200).json(user);
                } 
  
            }else{
                res.status(401).json('Wrong username or password!')
  
            }
        }
    )
}

module.exports.registration=function(req,res){
    console.log("in registration");
    User.findOne(
        {username:req.body.username}).then(
            user=>{
                if(!user) { //ukoliko korisnik sa istim imenom ne postoji
                console.log(req.body);
                var user = new User();
                user.username = req.body.username;
                user.fullname = req.body.fullname;
                user.password = req.body.password;
                user.email = req.body.email;
                user.city =  req.body.city;
                user.type = req.body.type;
                
        user.save();
        res.json({msg:"User signed in succesfully"});
            }
            else {
                res.status(401).json({error:'User with that username has already exsist'});
            }
         }
        )       
};


module.exports.logout=function(req,res)
{
    User.findOneAndUpdate({username:req.body.username},{$set:{isActive:false}},(err,doc)=>{
        if(err){
            res.status(401);
        } else {
            res.status(200);
        }
    })
    res.json({msg:"User logged out"});
        
}

module.exports.changepassword = function(req,res)
{
    console.log(req.body)
    User.findOneAndUpdate({username:req.body.username, password:req.body.oldPassword},
        {$set:{password:req.body.newPassword}}).then(
        user=>{
            if(user) {
                user.password = req.body.newPassword;
                res.status(200).json(user);
            } else {
                res.status(404).json("Wrong password");
            }
        }
    );

}


module.exports.deleteAcc=function(req,res)
{   
    const username = req.body.username;
    User.remove({username:username},(err,doc)=>{
        if(err){
            res.status(401);
        } else {
            res.status(200);
        }
    })
    res.json({msg:"User removed from app"});
        
}