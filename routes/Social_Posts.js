const express = require('express');
const app = express();
const router=express.Router();
const Social_Post= require('../models/Social_Post');
const cors=require('cors');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));
app.use("/images", express.static('images'));

// Add social post
router.post('/', async (req, res) => {
    const social_post=new Social_Post({
      Username: req.body.Username,
      Image:req.body.Image,
      Caption: req.body.Caption,
      Likes: null,
      Comments: null
    })
    console.log(social_post);
    try{
        const newPost = await social_post.save();
        res.status(201).json(newPost);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

// Like & Comment to Post
router.patch('/post_like_comment/:id', setLikeComment ,async (req,res)=>{
        if(res.user.Likes === null){
            res.user.Likes = [req.body.Likes[0]]
            res.user.Comments = [req.body.Comments[0]]
        }else{
            res.user.Likes = [res.user.Likes[0], req.body.Likes[0]]
            res.user.Comments = [res.user.Comments[0], req.body.Comments[0]]
        }
    try{
        const updatedUser = await res.user.save();
        res.json("Updated User likes & comments: " + updatedUser)
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

// Udpate Caption
router.patch('/upost_caption/:id', setLikeComment ,async (req,res)=>{
    if(res.user.Caption !== null){
        res.user.Caption = req.body.Caption
    }
    try{
        const updatedCaption = await res.user.save();
        res.json("Updated caption: " + updatedCaption)
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

// Delete post
router.delete('/:id', setLikeComment, async (req, res)=>{
    try {
        await res.user.remove();
        res.send({message: 'Deleted successfully'});
    }catch(err){
        res.send(500).json({message: err.message});
    }
});

// Total likes
router.get('/comm_likes/:id', setLikeComment, async (req,res)=>{
    res.send(res.user.Comments);
})

// Update likes & Comments to Post
async function setLikeComment(req, res, next){
    let user
    try{
        user=await Social_Post.findById(req.params.id);
        if(user == null){
            return res.status(404).json({message: 'User not found'});
        }
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
    res.user=user
    console.log(res.user.id);
    next()
}


module.exports=router