import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost, uploadImagequestion, uploadPostquestion, uploadFile } from "../../actions/UploadAction";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const loading1 = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

   // handle Image Change
   const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setFile(img);
    }
  };

  const imageRef = useRef();
  const fileRef = useRef();

  //file upload
  const handleUploadFile = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      type: 'File',
      userName: user.firstname,
    };

    // if there is an image with post
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.file = fileName;
      try {
        await dispatch(uploadFile(data));
      } catch (err) {
        console.log(err);
      }
    }
     await dispatch(uploadPost(newPost));
    setTimeout(() => {
      window.location.reload();
      
    }, 100);
    resetShare();
  };

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      type: 'Post.',
      userName: user.firstname,
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      try {
        await dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
     await dispatch(uploadPost(newPost));
    setTimeout(() => {
      window.location.reload();
      
    }, 100);
    resetShare();
  };

  // handle question
  const handleUploadQuestion = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      type: 'Question?',
      userName: user.firstname,
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      try {
        dispatch(uploadImagequestion(data));
      } catch (err) {
        console.log(err);
      }
    }
    const myData = await dispatch(uploadPostquestion(newPost));
    setTimeout(() => {
      window.location.reload();
      
    }, 100);
    
    
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    setFile(null);
    desc.current.value = "";
   
  };
  return (
    <div className="PostShare">
      {user.isAdmin === true && window.location.href === 'http://localhost:3000/home' || user.isAdmin === true && window.location.href !== 'http://localhost:3000/home'
        ? (<></>):(<><img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="Profile"
        />
        <div>
          <input
            type="text"
            placeholder="What's happening?"
            required
            ref={desc}
          />
          <div className="postOptions">
          <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => fileRef.current.click()}
            >
              <UilScenery />
              File
            </div>

            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>

  
            {/* <div className="option" style={{ color: "var(--video)" }}>
              <UilPlayCircle />
              Video
            </div>
            <div className="option" style={{ color: "var(--location)" }}>
              <UilLocationPoint />
              Location
            </div>
            <div className="option" style={{ color: "var(--shedule)" }}>
              <UilSchedule />
              Shedule
            </div> */}
            <button
              className="button ps-button"
              onClick={handleUpload}
            >
              {"Share As a Post"}
            </button>

            <button
              className="button ps-button"
              onClick={handleUploadQuestion}
            >
              {"Share As a Question"}
            </button>

            <button
              className="button ps-button"
              onClick={handleUploadFile}
            >
              {"Share As a File"}
            </button>
  
            <div style={{ display: "none" }}>
              <input type="file" ref={imageRef} onChange={onImageChange} />
            </div>
            <div style={{ display: "none" }}>
              <input type="file" ref={fileRef} onChange={onFileChange} />
            </div>
          </div>
  
          {image && (
            <div className="previewImage">
              <UilTimes onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="preview" />
            </div>
          )}
          {file && (
            <div className="previewImage">
              <UilTimes onClick={() => setFile(null)} />
              {/* <img src={URL.createObjectURL(file)} alt="preview" /> */}
              <embed src={URL.createObjectURL(file)} width="200px" height="200px" />
            </div>
          )}
        </div></>)}


      



    </div>
  );
};

export default PostShare;
