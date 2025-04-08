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



            <div className='p-5 flex flex-col cursor-pointer w-[30%] min-w-[280px] h-auto items-start  rounded-2xl bg-gray-100' onClick={() => handleNavigate(item?._id)} key={item?._id}>
            {/* // <div className='mb-5 break-inside-avoid border bg-gray-300 p-4 rounded-lg shadow-md' onClick={() => handleNavigate(item?._id)} key={item?._id}> */}
              <div className="m-1 p-1 w-full " >
                <img src={item.blogImg} alt="" className='p-2 w-full h-50 border-3 border-gray-300 rounded-tl-3xl rounded-br-3xl object-cover' />
              </div>
              <hr className='w-[100%] text-gray-700' />
              <div className=' mt-2 p-2 rounded-3xl text-4xl font-medium text-gray-500 '>{item.title.split(' ').slice(0, 4).join(' ')}...</div>
              {/* <div className='my-2 p-2 text-black text-lg font-sans'>
                {item.content.split(' ').slice(0, 15).join(' ')}...
              </div> */}
              <div className="my-2 p-2 text-black text-lg font-sans" 
     dangerouslySetInnerHTML={{ __html: item.content.split(' ').slice(0, 20).join(' ') }} />
              <div className="flex gap-2 ">
                <img src={item?.authorId?.avatar} alt="" className='w-10 h-10 border-1 rounded-[100%]' />
                <span className='p-2 bg-gray-900 text-white rounded-3xl'>Created by:- <span className='font-medium'>{item.authorId?.username}</span></span>

              </div>
            
            </div>
          ))
        )
      }
    </>
  )
}

export default Card
