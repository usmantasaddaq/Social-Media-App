import React,{useEffect,useState} from 'react'
import './TrendCard.css'
import {TrendData} from '../../Data/TrendData.js'
import { getAllUser,friendsuggestion,findAllDepartment,getfindAll } from "../../api/UserRequests";
import { useSelector } from "react-redux";
import UserFollowing from "../UserFollowingSuggestion/UserFollowingSuggestion"
import User from "../User/User";
const TrendCard = () => {
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
        const  { data }  = await friendsuggestion(user._id);
        const arrUniq = [...new Map(data?.map(v => [v._id, v])).values()]
        setFollowingData(arrUniq);
      };
      fetchFollowingUsers();
      const fetchDepartment = async () => {
        const data = await getfindAll();
        setFollowingData1(data);
      };
      fetchDepartment();
  }, []);
  return (
<>
    {user.isAdmin == false
    ?
<>  
   {/* <div className="TrendCard">
       <h3>Trends for your</h3>

       {followingData1?.data?.map((trend, id)=>{
          return(
              <div className="trend" key={id}>
                  <span>#{trend.content}</span>
                  <span>{trend.title}</span>
              </div>
          )
        // }
       })}
   </div> */}
   <div> 
       <h3>Friends Suggestions</h3>  
      {followingData?.map((followingData, id,persons) => {
       

        return <UserFollowing person={persons} followingData={followingData} key={id} />;
      })}

   </div>
</>
:
<></>
}
</>
  )
}

export default TrendCard