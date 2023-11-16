import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../api/UserRequests";
import { getPost } from "../../api/PostsRequests";
const ProfileCard = ({ location }) => {
  const userData = useSelector((state) => state.authReducer.authData);
  const postsData = useSelector((state) => state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
 
const [user, setUserData] = useState(userData.user)
const [posts, setPostsData] = useState(postsData)

const { id } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      
       try {
        
          const { data } = await getUser(id);
          const {data:postData} = await getPost(id)
      
          setUserData(data);
          setPostsData(postData)
         
        } catch (error) {
          console.log(error);
        }
      
      
    };

    if (user._id !== id ) {
      getUserData();
    } else {
      setUserData(userData.user);
      setPostsData(postsData)
    }
      
  }, []);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={
          user.coverPicture
            ? serverPublic + user.coverPicture
            : serverPublic + "defaultCover.jpg"
        } alt="CoverImage" />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}<span style={{color:"blueviolet",paddingLeft:"4px"}}>{user.userType === "teacher" ? "✔" : null}</span> </span>
        <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        {user.isAdmin === true && window.location.href === 'http://localhost:3000/home' || user.isAdmin === true && window.location.href !== 'http://localhost:3000/home' ? ("") : (

          <>
            <hr />
            <div>
              <div className="follow">
                <span>{user.followers?.length}</span>
                <span>Followers</span>
              </div>
              <div className="vl"></div>
              <div className="follow">
                <span>{user?.following?.length}</span>
                <span>Following</span>
              </div>
              {/* for profilepage */}

              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>{
                    posts?.filter((post) => post.userId === user._id).length
                  }</span>
                  <span>Posts</span>
                </div>{" "}
              </>

            </div>
            <hr />

          </>

        )}
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
