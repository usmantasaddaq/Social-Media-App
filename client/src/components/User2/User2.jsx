import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser} from "../../actions/UserAction";
import { getUser, responsefriendrequest } from "../../api/UserRequests";
import ShareModal from "../ShareModal/ShareModal";
import imag from "../../img/img2.png"
import {friendrequest } from "../../api/UserRequests";
import { createChat,findChat } from "../../api/ChatRequests";
const User = ({ person, followingData, valuerequest }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  const [modalOpened, setModalOpened] = useState(false);
  const [userData, setUserData] = useState({})
  const [following, setFollowing] = useState(
    person?.followers?.includes(user._id)
  );

  useEffect(() => {
    
    const getUserData = async () => {
      try {
        const { data } = await getUser(person.senderId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

   getUserData();
  }, []);

  
    
  const handleFollow = async (e) => {
 
   
    let value2 = await responsefriendrequest(person.requestedId,{senderId:person.senderId})
    dispatch(followUser( user._id, userData))
    if(value2.data.message === "Done"){
        window.location.reload();
        // window.location.reload();
    }
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
          <span>{person.senderName}</span>
          <span>@{person.senderName}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {"Approve"}
      </button>
    </div>
    </>
  );
};

export default User;
