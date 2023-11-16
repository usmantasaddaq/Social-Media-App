import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

// creating a post

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
// Close Question
export const closePost = async (req, res) => {

  const id = req.params.id;
  try {


    const post = await PostModel.findById(id);
    console.log(post)
    //   await post.updateOne({$push:{ open:false }});
    post.open = false;
    await post.save();
    res.status(200).json(post);

  } catch (error) {
    res.status(500).json(error);
  }
};
// report a post
export const reportPost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.reported?.includes(userId)) {
      res.status(403).json("Already Reported");
    } else {
      await post.updateOne({ $push: { reported: userId } });
      res.status(200).json("Post Reported Successfully");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// get a post

export const getPost = async (req, res) => {
  const id = req.params.id;


  try {
    const post = await PostModel.find({ userId: id });
    console.log("post", id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post

export const getAllPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) { }
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (JSON.stringify(post._id) === JSON.stringify(req.params.id)) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//warning to a post
export const warningPost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  console.log("userid", userId)
  console.log("id", id)
  try {
    const post = await PostModel.findById(id);
    console.log("post ", post)
    if (!post.warning) {
      await post.updateOne({ $set: { warning: true } });
      return res.status(200).json("warning added to post");
    }
    res.status(404).json("cannot add warning");
  } catch (error) {
    res.status(500).json(error);
  }
};
// commentPost

export const commentPost = async (req, res) => {
  const id = req.params.id;
  const { userId, name, comment } = req.body;
  try {
    const post = await PostModel.findById(id);
    console.log("post", post)
    if (post.comment.includes(userId)) {
      await post.updateOne({ $push: { comment: { userId, name, comment, badge: false } } });
      res.status(200).json("comment disliked");
    } else {
      await post.updateOne({ $push: { comment: { userId, name, comment, badge: false } } });
      res.status(200).json("Comment liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//add badge to a comment
export const comentBadge = async (req, res) => {
  const id = req.params.id;
  console.log("post_id", id)
  const { userId } = req.body;
  console.log("user_id", userId)
  try {
    const post = await PostModel.findById(id);
    // console.log("post 33", post)
    if (id && userId) {
      // const result = await PostModel.findOneAndUpdate({
      //   "comment.userId": userId
      // },
      //   {
      //     "$set": {
      //       "comment.$.badge": true
      //     }
      //   })
      // console.log("result",result)
      await PostModel.updateOne(
        { _id: id, "comment.comment": userId },
        { $set: { "comment.$.badge": true} }
      );
      //   await post.updateOne({'comment.userId': userId}, {$set: {
      //     'comment.$.badge':true
      // }});
      res.status(200).json("Badge is added");
    } else {
      res.status(403).json("You cannot add badge to this post");
    }


  } catch (error) {
    res.status(500).json(error);
  }
};


// Get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });


    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);


    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
