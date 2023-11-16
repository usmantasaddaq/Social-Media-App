import React, { useState, useEffect } from "react";
import "./Post.css";
import ReplyLeft from "../../img/reply-left.png";
import Comment from "../../img/comment.png";
import Delete from "../../img/delete.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import ShareModal from "../ShareModal/ShareModal";
import { likePost, DeletePost, getAllPost, commentPost, reportPost, warningPost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import FollowersModal2 from "../FollowersModal2/FollowersModal2";
import { closePost } from "../../api/UploadRequest";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getTimelinePosts } from "../../actions/PostsAction";


const Post = ({ data, fetchPosts }) => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data?.likes?.includes(user._id));
  const [modalOpened, setModalOpened] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(data.open);
  const [modalOpened1, setModalOpened1] = useState(false);
  const [likes, setLikes] = useState(data.likes.length)
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  };


  const handlePostReport = async () => {
    const res = await reportPost(data._id, user._id);
    if (res) {
      fetchPosts()
      setTimeout(() => {
        window.location.reload()
        window.location.reload()
      }, 100);
    }
  };
  const handleWarning = async () => {
    const res = await warningPost(data._id, user._id);
    if (res) {
      fetchPosts()
      setTimeout(() => {
        window.location.reload()
        window.location.reload()
      }, 100);
    }
  };
  const handleDelete = async () => {
    let value = await DeletePost(data._id, user._id);

    if (value?.data == "Post deleted.") {

      fetchPosts()
      setTimeout(() => {
        window.location.reload()
        window.location.reload()
      }, 100);

    }
  };

  const handleClosePost = async (id) => {
    let value = await closePost(id);

    if (value.data) {
      fetchPosts()
      setTimeout(() => {
        window.location.reload()
        window.location.reload()
      }, 100);
    }
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
 

  return (
    <div className="Post">
      <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
        <div>
          <span>
            <div className="postProfileImages">
              <img
                style={{ width: "25px" }}
                src={
                  user.profilePicture
                    ? serverPublic + user.profilePicture
                    : serverPublic + "defaultProfile.png"
                }
                alt="ProfileImage"
              />
              <div style={{ marginLeft: "5px", textTransform: "uppercase" }}>
                {data.userName}

              </div>
            </div>
          </span>
          <span style={{ fontWeight: "bold", color: "GrayText", fontSize: "16px" }}>
            <p>  {data.createdAt.slice(0, 10)} </p>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px", height: "30px", gap: "10px" }}>
          {
            data.userId === user._id && data.warning && <div style={{ backgroundColor: "rgba(255, 99, 71, 0.4)", color: "white", border: "1px solid red", padding: "5px" }}>Warning Your post is reported</div>
          }
          {
            user.isAdmin ? (
              <button style={{ backgroundColor: data.warning ? "InfoBackground" : "#f95f35", border: "1px solid #f95f35", borderRadius: "4px", cursor: "pointer" }} onClick={() => {
                if (!data.warning) {
                  handleWarning()
                }
              }}>{data.warning ? "Warning Sent" : "Send Warning"}</button>
            ) : (
              <button style={{ backgroundColor: data.reported?.includes(user._id) ? "#eae8e4" : "#f9a225", border: "1px solid #f95f35", borderRadius: "4px", cursor: "pointer" }} onClick={() => {
                if (!data.reported?.includes(user._id)) {
                  handlePostReport()
                }
              }}>{data?.reported?.includes(user._id) ? "Reported" : "Report"}</button>
            )

          }

          {
            user?._id === data?.userId && data.type === "Question?" && <button onClick={() => data.open ? handleClosePost(data._id) : null} style={{ backgroundColor: `${data.open ? "#49be25" : "#eae8e4"}`, border: `${data.open ? "1px solid #49be25" : "1px solid #eae8e4"}`, borderRadius: "4px", cursor: `${data.open ? "pointer" : "not-allowed"}` }}>{
              data.open ? "Close" : "Closed"
            }</button>
          }
        </div>
      </div>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        {data?.desc && <span style={{ display: "flex" }}> <p>Description : {data.desc} </p></span>}
      </div>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
      {
        data.file && <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}><embed src={data.file ? process.env.REACT_APP_PUBLIC_FOLDER + data.file : ""} width="300px" height="200px" /> <button className="button rs-button" style={{ cursor: "pointer", height: "60px" }} onClick={() => window.open(process.env.REACT_APP_PUBLIC_FOLDER + data.file, "_blank")}>Click to view the pdf</button></div>

      }

      <div className="postReact">
        {!data.file && <><img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
          <img src={data.type === "Question?" ? ReplyLeft : Comment} width={25} height={25} style={{ cursor: "pointer" }} alt="" onClick={() => setModalOpened(true)} /></>}
        <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} op={2} value={user} post={data} fetchPosts={fetchPosts} />
        {/* <img src={Share} alt="" onClick={() => setModalOpened1(true)} /> */}
        <FollowersModal2 modalOpened={modalOpened1} setModalOpened={setModalOpened1} comment={true} post={data} />
        {
          ((user?._id === data?.userId) || user.isAdmin) &&
          <img src={Delete} alt=""
            style={{ cursor: "pointer", width: "25px", height: "25px" }}
            onClick={handleDelete} />
        }
      </div>

      {!data.file && <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>}

      {data.type === "Question?" && <div className="commentSection">

        {
          data.comment.slice(0, 2).map((data) => {
            return <div style={{ display: "flex" }}><img
              style={{ width: "25px", margin: "5px 10px 5px 0px" }}
              src={
                user.profilePicture
                  ? serverPublic + user.profilePicture
                  : serverPublic + "defaultProfile.png"
              }
              alt="ProfileImage"
            /> <span>{data.comment}</span></div>
          })
        }
        <span style={{ display: "flex", alignSelf: "center", cursor: "pointer" }} onClick={() => setModalOpened(true)}>view all comments</span>
      </div>}

    </div >
  );
};

export default Post;
