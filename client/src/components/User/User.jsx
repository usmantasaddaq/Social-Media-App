import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser} from "../../actions/UserAction";
import ShareModal from "../ShareModal/ShareModal";
import imag from "../../img/img2.png"
import {friendrequest,responsefriendrequests } from "../../api/UserRequests";
import { createChat,findChat } from "../../api/ChatRequests";
const User = ({ person, followingData, valuerequest }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  const [modalOpened, setModalOpened] = useState(false);
  
  const [following, setFollowing] = useState(
    person?.followers?.includes(user._id)
  );
  const data = {
    senderId: user._id,
    receiverId:person._id
  }

  
  const handleFollow = async (e) => {
    
    let value2 = await responsefriendrequests(person._id,{senderId:user._id})
  
    if( person && person.accountType == 'private' && value2.data.message == 'Not found' && !following)
    {
      setModalOpened(true)
      await friendrequest({requestedName:person.firstname,requestStatus:"pending",requestedId: person._id,senderId : user._id,senderName : user.firstname,senderPic : "null"})
    }
    // if( person && person.accountType == 'public' && value2.data.message == 'Not found' )
    // {
      following
      ? dispatch(unfollowUser(person._id, user))
      : person?.accountType !== "private" && dispatch(followUser(person._id, user));
      setFollowing((prev) => !prev);
      let value =    await findChat (user._id,person._id)
      if(value.data === null){
        if(e.target.innerHTML === "Unfollow"){
          await createChat(data);

        }else{
          console.log("Follow")
          
        }
      }else{
        console.log("not null")
        // setTimeout(() => {
        //   window.location.reload()
        // }, 100);
      }
    // }
    
    // if(value2.data.requestStatus == "approve")
    // {
      // following ? 
      // dispatch(unfollowUser(person._id, user))
      // : dispatch(followUser(person._id, user));
      // setFollowing((prev) => !prev);
      // let value =    await findChat (user._id,person._id)
      // if(value.data === null){
      //   if(e.target.innerHTML === "Unfollow"){
      //     await createChat(data);
      //   }else{
      //     console.log("Follow")
      //   }
      // }else{
      //   console.log("not null")
      // }
    // }
    
  };
  return (
    <>
    <div className="follower">
    <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} op={4} value={user} post={data}/>
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
          <span>{person.firstname}</span>
          <span>@{person.firstname}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
    </>
  );
};

export default User;
