import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: {type: String},
    userName:{type:String,required:true},
    type:{type:String,required:true},
    warning:{type:Boolean,default:false},
    open:{type:Boolean,default:true},
    likes: [],
    reported:[],
    comment:[],
    reports:[],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
    file: String
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
