import React, { useEffect, useState } from 'react'
import './Card.css'
import loadinggif from '../assets/loading-gif.gif'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Card() {
  const [blogs, setBlogs] = useState(null)
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isLoading, setLoading] = useState(false)
  const fetchBlogData = async () => {

    setLoading(true)
    try {
      const res = await axios.get(`${API_BASE_URL}/v1/users/get-blogs`)
      if (!res)
        console.log("Couldn't get blog data on Home")
      console.log("Blogs data: " + res.data?.data)
      setBlogs(res?.data.data);
      setLoading(false)

    } catch (error) {
      console.log("Error in Loading Blogs on Home")
    }
  }
  useEffect(() => {
    fetchBlogData();
  }, [])
  const navigate = useNavigate()
  const handleNavigate = (id) => {
    navigate(`/blog/${id}`)
  }
  return (
    <>

      {
        isLoading ? (
          <div className="loading-container">
            <img src={loadinggif} alt="Loading..." className="loading-gif" style={{ color: 'white' }} />
          </div>
        ) : (
          blogs &&
          blogs.map(item => (



            <div className='m-container' onClick={() => handleNavigate(item?._id)} key={item?._id}>
              <div className="img-cont" >
                <img src={item.blogImg} alt="" className='blogimg' />
              </div>
              <hr className='line' />
              <div className='heading'>{item.title.split(' ').slice(0, 15).join(' ')}...</div>
              <div className='desc'>
                {item.content.split(' ').slice(0, 50).join(' ')}...
              </div>
              <div className="creator-detail">
                <img src={item?.authorId?.avatar} alt="" className='image' />
                <span className='created'>Created by:- <span style={{fontWeight:'600',backgroundColor:'white'}}>{item.authorId?.username}</span></span>

              </div>
            
            </div>
          ))
        )
      }
    </>
  )
}

export default Card
