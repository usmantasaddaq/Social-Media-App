import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../PostShare/PostShare";
import { updateRecord, create } from "../../api/UserRequests";
import { commentPost } from "../../api/PostsRequests";
import FollowersCard2 from "../FollowersCard2/FollowersCard2";
import { uploadAnnouncement } from "../../api/AnnouncementRequests";
const ShareModal = ({ modalOpened, setModalOpened, modalOpened1, setModalOpened1, val, op, value, post, fetchPosts }) => {
  const theme = useMantineTheme();
  const [inputValue, setInputValue] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateRecord(modalOpened1._id, { title: inputValue, content: inputValue })
    setModalOpened(false)
  };

  const handleInputChange1 = (event) => {
    setInputValue(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };
  const handleInputChange3 = (event) => {
    setInputValue3(event.target.value);
  };
  const handleSubmit1 = async (event) => {
    event.preventDefault();
    await create({ title: inputValue, content: inputValue })
    setModalOpened(false);
  };
  const handleSubmit12 = async (event) => {
    event.preventDefault();
    await commentPost(post._id, value._id, value.firstname, inputValue2)
    setInputValue2('');
    await fetchPosts();
    setTimeout(() => {
      window.location.reload(true)

    }, 100);

  };
  const handleSubmit3 = async (event) => {
    event.preventDefault();
    // console.log("event", inputValue3)
    await uploadAnnouncement({ message: inputValue3 })
    // commentPost(post._id, value._id, value.firstname, inputValue2)     post announcements here
    setInputValue3('');
    // fetchPosts();   fetch announcements here
    // setTimeout(() => {
    //   window.location.reload()
    // }, 100);

  };
  const handleSubmit123 = async (event) => {
    setModalOpened(false);
    await fetchPosts();
    setTimeout(() => {
      window.location.reload(true)

    }, 100);

    
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size='30%'
      opened={modalOpened}
      onClose={() => setModalOpened(false)}

    >
      {op == 1 ? (<form onSubmit={handleSubmit}>
        <h1> Update Record</h1>
        <label>
          <div>
            <input
              required
              type="text" placeholder="Last Name" value={inputValue} onChange={handleInputChange}
            />
          </div>
        </label>

        <button style={{ justifyContent: "center" }} className="button infoButton" type="submit">Submit</button>
      </form>) : (op == 0 ? (<form onSubmit={handleSubmit1}>
        <h1> Create Record</h1>
        <label>
          <div>
            <input
              required
              type="text" placeholder="Last Name" value={inputValue} onChange={handleInputChange1}
            />
          </div>
        </label>

        <button style={{ justifyContent: "center" }} className="button infoButton" type="submit">Submit</button>
      </form>) : (op == 2 ? (
        <>
          <form onSubmit={handleSubmit12}>
            <h3> ADD A {post.type === "Post." ? "COMMENT" : "Answer"}</h3>
            <label>
              <div>
                <input
                  required
                  disabled={!post.open}
                  style={{ width: "97%", height: "2.5rem" }}
                  type="text" placeholder="Comment" value={inputValue2} onChange={handleInputChange2}
                />
              </div>
            </label>

            <button style={{ justifyContent: "center", marginTop: "10px" }} disabled={!post.open} className="button infoButton" type="submit">Submit</button>

          </form>
          <FollowersCard2 fetchPosts={fetchPosts} post={post} />
        </>
      ) : (op == 3 ? (
        <form onSubmit={handleSubmit3}>
          <h3> Create Announcements</h3>
          <label>
            <div>
              <input
                required
                style={{ width: "97%", height: "2.5rem" }}
                type="text" placeholder="Announcement" value={inputValue3} onChange={handleInputChange3}
              />
            </div>
          </label>

          <button style={{ justifyContent: "center", marginTop: "10px" }} className="button infoButton" type="submit">Submit</button>

        </form>
      ) : (<form onSubmit={handleSubmit123}>
        <h1>This is a private you can not follow until user allowed it.</h1>
        <button style={{ justifyContent: "center" }} className="button infoButton" type="submit">Ok</button>
      </form>))))}
    </Modal>
  );
};

export default ShareModal;
