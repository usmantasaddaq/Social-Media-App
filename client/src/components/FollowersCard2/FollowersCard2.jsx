import React, { useEffect, useState } from "react";
import "./FollowersCard2.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser, followingUser } from "../../api/UserRequests";
import User from "../User/User";
import UserFollowing from "../UserFollowing/UserFollowing"
import { useDispatch, useSelector } from "react-redux";
import { badgePost, commentPost, getPost } from "../../api/PostsRequests";
import badge from '../../img/badge.png'
import { getTimelinePosts } from "../../actions/PostsAction";
window.$value = [];
const FollowersCard2 = ({ location, post }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [followingData1, setFollowingData1] = useState(post);
  const { user } = useSelector((state) => state.authReducer.authData);

    const dispatch = useDispatch();
  const fetchPosts = async () => {
    await dispatch(getTimelinePosts(user._id));
    window.$UserType = user.isAdmin;
    // window.location.reload()
  };

  const giveBadge=async(userId)=>{
    const res = await badgePost(post._id,userId);
  fetchPosts()
   setTimeout(() => {
 
     
      window.location.reload(true)

 
   }, 100);
  }
  // useEffect(() => {
  //   const fetchPersons = async () => {
  //     const { data } = await getAllUser();
  //     setPersons(data);
  //   };
  //   fetchPersons();
  //   const fetchFollowingUsers = async () => {
  //     const { data } = await followingUser(user._id);
  //     setFollowingData(data);
  //   };
  //   fetchFollowingUsers();
  //   const fetchFollowingUsersPost = async () => {
  //     const data = await getPost(post._id);
  // console.log("followingData1", data)

  //     setFollowingData1(data);
  //   };
  //   fetchFollowingUsersPost();
  // }, []);
  

  return (
    <>
      <h3 >{post.type === "Post." ? "COMMENTS:" : "ANSWERS:"} </h3>
      <div style={{ padding: "10px", marginTop: "15px" }} className="FollowersCard1">


        <div className="post">
          {/* <h2>{followingData1?.data?.desc}</h2> */}
          {post.comment?.slice(0).reverse().map(comment => (
            <div className="comment">

              <div style={{ margin: "10px 0px" }} className="follower">
                <div>
                  <img
                    style={{ width: "30px", height: "30px" }}
                    src={
                      publicFolder + "defaultProfile.png"
                        ? publicFolder + "defaultProfile.png"
                        : publicFolder + "defaultProfile.png"
                    }
                    alt="profile"
                    className="followerImage"
                  />
                  <div className="name">


                    <span style={{ textTransform: "uppercase" }}>@{comment?.name}</span>
                    <span style={{backgroundColor: comment.badge? "bisque" : null}}>{comment?.comment}</span>

                  </div>
                </div>
                <div>
                  {
                    comment.badge?(
                     <img src={badge} alt="hello" style={{ width: "20px", height: "20px",backgroundColor:comment.badge?"gold":"" }}  />

                    ):(
                      post.userId === user._id &&  <button onClick={()=>{ giveBadge(comment.comment)}} style={{color:"GrayText",padding:"2px",border:"1px solid grey",borderRadius:"2px",backgroundColor:"bisque", cursor:"pointer"}}>Badge</button>
                    )
                  }
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>

  );
};

export default FollowersCard2;
