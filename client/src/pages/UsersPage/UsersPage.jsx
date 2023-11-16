import React, { useEffect, useState } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequests";
import ShareModal from "../../components/ShareModal/ShareModal";
const UsersPage = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const { user } = useSelector((state) => state.authReducer.authData);
    const [allUsers, setAllUsers] = useState([])
  
    const getAllUsers = async () => {
        const res = await getAllUser();
        if (res.status === 200) {
            setAllUsers(res.data);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])
  return (
    <div className="Home">
      <ProfileSide/>
      <div style={{ display: "flex", paddingTop:"20%", flexDirection: "column", gap: "20px",height:"100vh" }}>

                {user.isAdmin ? (
                    <div className="TrendCard" style={{padding:"10px 30px 10px 30px"}}>
                        <div style={{ fontWeight: "bold", alignSelf: "center" }}>
                            All Registered User names
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div>
                                <div style={{fontSize:"18px",fontWeight:"bold"}}>Name</div>
                                {


                                    allUsers ?
                                        allUsers.map((user) => (
                                            !user.isAdmin &&
                                            <div style={{ display: "flex", flexDirection: "column",gap:"10px" }}>

                                                {user.firstname} {user?.lastname}
                                            </div>
                                        )) : (
                                            "currently no user available"
                                        )
                                }
                            </div>
                            <div>
                                <div>Role</div>
                                {


                                    allUsers ?
                                        allUsers.map((user) => (
                                            !user.isAdmin &&
                                            <div style={{ display: "flex", flexDirection: "column" ,gap:"10px"}}>

                                                {user.userType}
                                            </div>
                                        )) : (
                                            "currently no user available"
                                        )
                                }
                            </div>
                        </div>


                    </div>
                ) :
                    ""}
            </div>
      <RightSide />
    </div>
  );
};

export default UsersPage;
