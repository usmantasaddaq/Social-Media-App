import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import { useParams } from "react-router-dom";

const PostSide = () => {
  const params = useParams();

  return (
    <div className="PostSide">

      {!params.id && <PostShare/>}
      <Posts/>
    </div>
  );
};

export default PostSide;
