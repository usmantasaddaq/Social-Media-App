import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser} from "../../actions/UserAction";
import { createChat } from "../../api/ChatRequests";
const UserFollowingSuggestion = ({ person, followingData }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person?.followers?.includes(user._id)
  );
  const data = {
    senderId: user._id,
    receiverId:person._id
  }
  const handleFollow = async (e) => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
    if(e.target.innerHTML === "Follow"){
      await createChat(data);
    }else{
      console.log("Follow")
    }
  };

  return (
    <>
    <div className="follower">
     { 
      user?.following?.includes(followingData._id) ?  null :
     <div>
        <img
          src={
            publicFolder + "defaultProfile.png"
              ? publicFolder + "defaultProfile.png"
              : publicFolder + "defaultProfile.png"
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>@{followingData?.firstname} {followingData?.lastname}</span>
        </div>
      </div>}
      {/* <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button> */}
    </div>
    </>
  );
};

export default UserFollowingSuggestion;
