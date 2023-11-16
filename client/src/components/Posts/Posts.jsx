import React, { useEffect, useState } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import Post from "../Post/Post";
import { Table } from "reactstrap"
import ShareModal from "../ShareModal/ShareModal";
import { create } from "../../api/UserRequests";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser, friendsuggestion, findAllDepartment, getfindAll, deletedepartment } from "../../api/UserRequests";
import { likePost, DeletePost, getAllPost, getPost } from "../../api/PostsRequests";
import "./Posts.css";
import { useParams } from "react-router-dom";
import Updatedeparmentmodel from '../Updatedepartment/Updatedeparmentmodel'
import axios from 'axios'
import { Loader } from "@mantine/core";
window.$UserType = null;
window.$value = 0;
const Posts = () => {
  const params = useParams()


  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const [datam, setData] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalOpened1, setModalOpened1] = useState();
  const [modalOpeneds, setModalOpeneds] = useState(false);
  const [datam1, setData1] = useState(0);
  const [datam12, setData12] = useState(null);
  const [followingData1, setFollowingData1] = useState([]);
  const storageActive = localStorage.getItem("type")
  const [activeBtn, setActiveBtn] = useState(storageActive || "Question?");
  const items = JSON.parse(localStorage.getItem('userdetail'));
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let postsData = useSelector((state) => state.postReducer);
  const [posts, setPostsData] = useState(postsData.posts)
const [ dataLoading, setDataLoading] = useState(true);
  const fetchPosts = async () => {
    await dispatch(getTimelinePosts(user._id));
    window.$UserType = user.isAdmin;
    // window.location.reload()
  };

  useEffect(() => {
   
     
       fetchPosts();
      
    

  }, []);

  useEffect(() => {
    const getUserData = async () => {
      try {

        let { data } = await getPost(params.id)
        data = data.filter((post) => post.userId === params.id)
        setPostsData(data)

      } catch (error) {
        console.log(error);
      }
    };

    if (params.id) {

      if (user._id !== params.id) {
        getUserData();
      } else {
        postsData.posts = postsData.posts.filter((post) => post.userId === params.id)
        setPostsData(postsData.posts)
      }
    }

  }, []);

  //   useEffect(() => {
  //     const getData = async () => {
  //         const { data } = await axios.get(`http://localhost:5098/api/add/departments/getall`);
  //         setData(data);
  //     }
  //     getData();
  // }, [datam]);
  useEffect(() => {
    const interval = setInterval(() => {
      const fetchDepartment = async () => {
        const data = await getfindAll();
        setFollowingData1(data);
        setDataLoading(false);
      };
      fetchDepartment();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {

    const fetchDepartment = async () => {
      const data = await getfindAll();
      setFollowingData1(data);
    };
    fetchDepartment();
  }, [datam1, datam12]);


  // useEffect(() => {

  //   const fetchDepartment = async () => {
  //     const data = await getfindAll();
  //     setFollowingData1(data);
  //   };
  //   fetchDepartment();
  // }, [datam12]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchDepartment = async () => {
        const data = await getAllPost();
        setData12(data)
      };
      fetchDepartment();
    }, 5000);


    return () => clearInterval(interval);
  }, []);
  const Handledelete = async (id) => {
    let value = await deletedepartment(id._id);
    setData1(+1)

  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await create({ title: state.email, content: state.password })
  };
  if (!posts) return 'No Posts';



  return (
    <div className="Posts">
      {user.isAdmin === true && window.location.href !== 'http://localhost:3000/home'
        ?
        <Table bordered hover striped >
          <thead className='bg-info text-dark' style={{ position: "relative", left: "-55px" }}>
            <tr>
              <th>DepartmentId</th>
              <th>DeparmentName</th>
              <th>Delete operation</th>
              <th>Update operation</th>

            </tr>
          </thead>
          <tbody>

            {
              followingData1.data?.length > 0 && followingData1.data.map((val, ind) =>
                <tr key={ind}>
                  <td>{val._id}</td>
                  <td>{val.title}</td>
                  <td><button className="button r-button" onClick={() => Handledelete(val)}> Delete</button></td>
                  <td><button className="button r-button" onClick={() => (setModalOpened(true), setModalOpened1(val))}> Update</button>
                    <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} modalOpened1={modalOpened1} setModalOpened1={setModalOpened1} val={val} op={1} value={user} post={null} /></td>

                </tr>
              )
            }

          </tbody>
        </Table>
        : <></>
      }
      {
        user.isAdmin === false && window.location.href === 'http://localhost:3000/home' &&
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "10%", height: "40px", backgroundColor: "rgba(255, 255, 255, 0.64)", padding: "5px" }}>
          <button style={{ backgroundColor: activeBtn === "Question?" ? "crimson" : "", color: activeBtn === "Question?" ? "white" : " black", borderRadius: "4px", border: "1px solid grey", cursor: activeBtn === "Question?" ? "" : "pointer" }} onClick={() => {setActiveBtn("Question?")
        localStorage.setItem("type","Question?")
        }} className="ps-button">Questions</button>
          <div style={{ height: "100%", borderLeft: "2px solid rgba(40, 52, 62, 0.09)" }}></div>
          <button style={{ backgroundColor: activeBtn === "Post." ?  "crimson": "", color: activeBtn === "Post." ?  "white" : "black" , borderRadius: "4px", border: "1px solid grey", cursor: activeBtn === "Post." ?  "": "pointer"  }} onClick={() => {setActiveBtn("Post.")
        localStorage.setItem("type","Post.")
        }} className="ps-button">Posts</button>
          <div style={{ height: "100%", borderLeft: "2px solid rgba(40, 52, 62, 0.09)" }}></div>
          <button style={{ backgroundColor: activeBtn === "File" ? "crimson" : "", color: activeBtn === "File" ?  "white": "black" , borderRadius: "4px", border: "1px solid grey", cursor: activeBtn === "File" ?  "" : "pointer"  }} onClick={() => {setActiveBtn("File")
        localStorage.setItem("type","File")
        }} className="ps-button">Files</button>

        </div>
      }
      { window.location.href !== 'http://localhost:3000/departments' ?
      (user.isAdmin === true && window.location.href === 'http://localhost:3000/home'
        ?
        dataLoading ? <Loader /> : 
        datam12?.data.map((post, id) => {
          if (post.reported.length > 0) {
            return <Post data={post} key={id} fetchPosts={fetchPosts}/>;
          }

        })

        : posts.sort((a, b) => new Date(...b.createdAt.split('-').reverse()) - new Date(...a.createdAt.split('-').reverse())).map((post, id) => {

          return (
            params.id ? (
              <Post data={post} key={id} fetchPosts={fetchPosts}/>
            ) :
              (activeBtn === post.type &&
                (<Post data={post} key={id} fetchPosts={fetchPosts}/>) )
          );
        })) : null
      }
    </div>
  );
};

export default Posts;
