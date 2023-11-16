import React, { useEffect, useState } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";
import { useSelector } from "react-redux";
import ShareModal from "../../components/ShareModal/ShareModal";
import { getAllUser } from "../../api/UserRequests";
const Departments = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const { user } = useSelector((state) => state.authReducer.authData);

    return (
        <div className="Home">
            <ProfileSide />
            <div style={{ display: "flex", paddingTop:"20%", flexDirection: "column", gap: "20px",height:"100vh" }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="button r-button" onClick={() => setModalOpened(true)}>Add Department</button>
                </div>
                <div>

                </div>
                <PostSide/>
                <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} op={0} value={user} post={null} />
            </div>
            <RightSide />
        </div>
    );
};

export default Departments;
