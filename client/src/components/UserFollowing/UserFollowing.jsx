import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser} from "../../actions/UserAction";
const UserFollowing = ({ person, followingData }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person?.followers?.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <>
    <div className="follower">
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
          <span>{followingData?.firstname}</span>
          <span>@{followingData?.firstname}</span>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserFollowing;
