import React, { useEffect, useState } from "react";
import "./RightSide.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import NavIcons from "../NavIcons/NavIcons";
import { getAllUser } from "../../api/UserRequests";
import { getAnnouncements } from "../../api/AnnouncementRequests";
const RightSide = ({ showcomp }) => {
  const navigate = useNavigate()
  const [modalOpened, setModalOpened] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [annData, setAnnData] = useState([]);

  const getAllUsers = async () => {
    const res = await getAllUser();
    if (res.status === 200) {
      setAllUsers(res.data);
    }
  }
  const { user } = useSelector((state) => state.authReducer.authData);
  const getAnn = async () => {
    const res = await getAnnouncements()
    setAnnData(res.data)
  }


  useEffect(() => {
    getAnn();

    getAllUsers();
  }, [])
  return (
    <div className="RightSide">
      {/* Side Navbar */}

      <NavIcons />
      {/* TrendCard */}
      {
        user.isAdmin == true &&
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
          <button className="button r-button" style={{ background: `${window.location.href !== 'http://localhost:3000/departments' ? "" : "black"}` }} onClick={() => navigate('/departments')}>
            Departments
          </button>
          <button className="button r-button" style={{ background: `${window.location.href !== 'http://localhost:3000/annoucements' ? "" : "black"}` }} onClick={() => navigate('/annoucements')}>
            Anouncements
          </button>
          <button className="button r-button" style={{ background: `${window.location.href !== 'http://localhost:3000/users' ? "" : "black"}` }} onClick={() => navigate('/users')}>
            Users
          </button>
          <button className="button r-button" style={{ background: `${window.location.href !== 'http://localhost:3000/home' ? "" : "black"}` }} onClick={() => navigate("/home")}>
            Reported Posts
          </button>
        </div>
      }
      {
        user.isAdmin == false &&
        <div className="TrendCard">
          <div style={{ display: "flex", justifyContent: "center", fontWeight: "bolder" }}>Announcements</div>
          <ul>
          {
           
            annData?.map((data) => (
              <div style={{ display: "flex", justifyContent: "start" }}>
                <li>
                  {data.message}
                </li>
              </div>
            ))
          }
          </ul>
        </div>
      }
      <TrendCard />

      {/* Share buttong */}
      {/* {user.isAdmin == true && window.location.href !== 'http://localhost:3000/home'
        ?
        <>
          <button className="button r-button" onClick={() => setModalOpened(true)}>
            Add Department
          </button>
          <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} op={0} value={user} post={null} />
        </>

        :
        <> */}
      {/* <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} /> */}
      {/* </> */}

      {/* // } */}
      {/* {user.isAdmin ? (
        <div className="TrendCard">
          <div style={{ fontWeight: "bold", alignSelf: "center" }}>
            All Registered User names
          </div>
          {

            allUsers ?
              allUsers.map((user) => (
                <div>
                  {user.firstname} {user?.lastname}
                </div>
              )) : (
                "currently no user available"
              )



          }
        </div>
      ) :
        ""} */}
    </div>
  );
};

export default RightSide;
