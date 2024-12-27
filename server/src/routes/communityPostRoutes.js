/*define endpoints and controllers for community module*/

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const verifyToken = require("../middlewares/authMiddleware");
require("../models/communityPostModel");
const communityPost =  mongoose.model("communityPost");


router.get('/allPost',verifyToken,(req,res)=>{
    communityPost.find()
    .populate("postedBy","_id name")
    //.populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})

// router.get('/getSubpost',verifyToken,(req,res)=>{

//     // if postedBy in following
//     Post.find({postedBy:{$in:req.user.following}})
//     .populate("postedBy","_id name")
//     .populate("comments.postedBy","_id name")
//     .sort('-createdAt')
//     .then(posts=>{
//         res.json({posts})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

router.post('/createPost',verifyToken,(req,res)=>{
    const {caption,photo} = req.body 
    if(!caption || !photo){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const post = new communityPost({
        caption,
        photo,
        postedBy: {
            id: req.user._id,
            username: req.user.username,
            role: req.user.role,
        },
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myPost',verifyToken,(req,res)=>{
    communityPost.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

// router.put('/like',verifyToken,(req,res)=>{
//     communityPost.findByIdAndUpdate(req.body.postId,{
//         $push:{likes:req.user._id}
//     },{
//         new:true
//     }).exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })
// router.put('/unlike',verifyToken,(req,res)=>{
//     communityPost.findByIdAndUpdate(req.body.postId,{
//         $pull:{likes:req.user._id}
//     },{
//         new:true
//     }).exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })


// router.put('/comment',verifyToken,(req,res)=>{
//     const comment = {
//         text:req.body.text,
//         postedBy:req.user._id
//     }
//     communityPost.findByIdAndUpdate(req.body.postId,{
//         $push:{comments:comment}
//     },{
//         new:true
//     })
//     .populate("comments.postedBy","_id name")
//     .populate("postedBy","_id name")
//     .exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })

// router.delete('/deletePost/:postId',verifyToken,(req,res)=>{
//     communityPost.findOne({_id:req.params.postId})
//     .populate("postedBy","_id")
//     .exec((err,post)=>{
//         if(err || !post){
//             return res.status(422).json({error:err})
//         }
//         if(post.postedBy._id.toString() === req.user._id.toString()){
//               post.remove()
//               .then(result=>{
//                   res.json(result)
//               }).catch(err=>{
//                   console.log(err)
//               })
//         }
//     })
// })

module.exports = router