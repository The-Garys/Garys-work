const Posts= require("../models/SpPosts")

module.exports={
 addPosts: async (req, res) => {
    const post = new Posts({
        title:req.body.title,
        description:req.body.description,
        date:req.body.date,

       
    });
       try{
       const savedPost = await post.save();
       res.json(savedPost);
      } catch(err) {
       res.json({message: err})
      }
     },


 getPosts: async (req, res) => {
    try {
      const posts = await Posts.find();
    //   console.log(posts );
      res.send(posts) ;
    } catch (error) {
      console.log(error);
    }
  },
}