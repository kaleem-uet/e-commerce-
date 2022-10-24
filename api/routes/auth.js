const express=require("express");
const mongoose=require("mongoose");
const router = express.Router();
const  bcrypt = require("bcrypt");
const User=require("../models/User");
const jwt = require("jsonwebtoken");
const privateKey="kaleem"

const checkAuth = require('../middleware/check-auth');

// register user 
router.post("/register",(req,res,next)=>{
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }else{
      const newUser=new User({
        _id:new mongoose.Types.ObjectId(),
        username:req.body.username,
        email:req.body.email,
        password:hash
     })
     newUser.save().then(()=>{
       res.status(201).json({
          userData:newUser,
          status:1,
           msg:"registger sucessfully"
       })
   }).catch(error=>{
       res.status(500).json({
        error:error,
        status:0,
        msg:"failed to create"
       })
   })

    }})
})


router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              isAdmin:user[0].isAdmin
            },
            "kaleem",
            {
                expiresIn: "1h"
            }

          );
          return res.status(200).json({
            userId: user[0]._id,
            message: "Auth successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//UPDATE 
router.put("/:id",checkAuth, (req, res,next) => {
  if(req.body.password)
  {
      bcrypt.hash(req.body.password, 10, (err, hash)=>{
         if(err){
          console.log(err);
         }else{
     User.findByIdAndUpdate(
        req.params.id,
        {
          password:hash
        },
        { new: true },
        function (err, docs) {
          if (err){
              console.log(err)
              res.send(500).json(err)
          }
          else{
              console.log("Password upadte:");
               res.status(200).json({
                 msg:"Password upadte",
                  password:docs.password
               }
                )
          }
        })
 
         } 
       })

      }
      else{
         
   User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
        function (err, docs) {
          if (err){
              console.log(err)
              res.send(500).json(err)
          }
          else{
              console.log("Updated User : ", docs);
               res.status(200).json(docs)
          }
        })
    
  
      }
    
      
    })

//DELETE
router.delete("/:userId", checkAuth, (req,res)=>{
  User.remove({ _id: req.params.userId })
  .exec()
  .then(result => {
    res.status(200).json({
      message: "User deleted"
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

//GET USER 
router.get("/",checkAuth,(req,res)=>{
  User.find().sort({ _id: -1 }).then((user)=>{
     res.status(200).json(user)
  }).catch(err=>{
    res.status(501).json(err)
  })
   
})
module.exports = router;