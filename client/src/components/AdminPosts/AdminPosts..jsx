import React from 'react'
import './AdminPosts.css'
import { SpamPosts } from '../../Data/PostsData'
import Post from '../AdminPost/Post'
const AdminPosts = () => {
  // const [someData, setsomeData] = useState(true)
  // const myReload = () => {
  //   console.log("hello")
  //   window.location.reload(true);
  // }
  return (
    <div className="Posts">
        {SpamPosts.map((post, id)=>{
            return <Post data={post} id={id} />
        })}
    </div>
  )
}

export default AdminPosts