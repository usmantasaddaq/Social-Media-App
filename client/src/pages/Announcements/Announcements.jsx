import React, { useEffect, useState } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";
import ShareModal from "../../components/ShareModal/ShareModal";
import { useSelector } from "react-redux";
import { getAnnouncements } from "../../api/AnnouncementRequests";
const Announcements = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const [annData, setAnnData] = useState([]);

    const { user } = useSelector((state) => state.authReducer.authData);
    const getAnn = async () => {
        const res = await getAnnouncements()
        setAnnData(res.data)
    }
    useEffect(() => {
        getAnn();
    }, [])
    return (
        <div className="Home">
            <ProfileSide />
            <div style={{ display: "flex", paddingTop: "20%", flexDirection: "column", gap: "50px", height: "100vh" }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="button r-button" onClick={() => setModalOpened(true)}>New Announcements</button>
                </div>
                <div>
                    <div className="TrendCard" style={{ padding: "10px 30px 10px 30px" }}>
                        <div style={{display:"flex", justifyContent:"center", fontWeight:"bolder"}}>Announcements</div>
                        {
                            annData?.map((data) => (
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    
                                    <span>

                                        {data.message}
                                    </span>
                                   
                                    <span>
                                        {new Date(data.createdAt).toDateString()}
                                    </span>
                                    
                                </div>
                            ))
                        }
                    </div>
                </div>
                <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} op={3} value={user} post={null} />
            </div>
            <RightSide />
        </div>
    );
};

export default Announcements;
