import React from 'react'
import './Post.css'
const Post = ({ data }) => {
    return (
        <div className="Post">
               <div className="detail">
                <span><b>{data.name}</b></span>
                <span> {data.desc}</span>
                <button className='button fc-button'>
                        Delete
                    </button>
            </div>
            <img src={data.img} alt="" />

            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{data.likes} likes</span>

         
        </div>
    )
}

export default Post