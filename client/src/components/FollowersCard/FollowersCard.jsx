import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser,followingUser,getfriendrequest } from "../../api/UserRequests";
import User from "../User/User";
import User2 from "../User2/User2";
import UserFollowing from "../UserFollowing/UserFollowing"
import { useSelector } from "react-redux";
window.$value = [];
const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [followingData1, setFollowingData1] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
    const fetchFollowingUsers = async () => {
      const  { data }  = await followingUser(user._id);
      setFollowingData(data);
    };
    fetchFollowingUsers();
    const fetchFollowingUsers1 = async () => {
      const   data   = await getfriendrequest(user._id);
      setFollowingData1(data);
    };
    fetchFollowingUsers1();
  }, []);


  return (
    <div className="FollowersCard">
      {user.isAdmin === true && window.location.href === 'http://localhost:3000/home' || user.isAdmin === true && window.location.href !== 'http://localhost:3000/home' ? (
       ""
      ) : (
        <>  
         <h3>Friend request</h3> 
         {followingData1?.data?.map((person, id) => {
          if (person._id !== user._id) return <User2 person={person} key={id} />;
        })}
        
        {!location ? (
          <span onClick={() => setModalOpened(true)}>Show more</span>
        ) : (
          ""
        )}
        <FollowersModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          comment={false}
        />     
        <h3>People you may know</h3>
        {persons.map((person, id) => {
          if (person._id !== user._id) return <User person={person} key={id} />;
        })}
        {persons.map((person, id) => {
          if (person._id === user._id) {
              window.$value = person
          };
        })}
        
        {!location ? (
          <span onClick={() => setModalOpened(true)}>Show more</span>
        ) : (
          ""
        )}
        <FollowersModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          comment={false}
        />
        <h3>Following you</h3>
        {followingData.map((followingData, id) => {
          return <UserFollowing person={persons} followingData={followingData} key={id} />;
        })}
        {!location ? (
          <span onClick={() => setModalOpened(true)}>Show more</span>
        ) : (
          ""
        )}
        <FollowersModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          comment={false}
        />
        </>
      )}



      
    </div>
  );
};

export default FollowersCard;
