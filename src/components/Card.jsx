import React, { useEffect, useState } from 'react'
import './Card.css'
import loadinggif from '../assets/loading-gif.gif'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
// import SaveTag from "../assets/images/3D_Tag.png"
import { FaHeart } from "react-icons/fa"
import { toast } from 'react-toastify'
import api from '../utils/api_Interceptor'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fetchBlogData = async () => {
  const res = await axios.get(`${API_BASE_URL}/v1/users/get-blogs`)
  // const res = await axios.get(`${API_BASE_URL}/v1/users/get-blogs`)
  return res.data?.data;
}


function Card() {
  // const [liked, setLiked] = useState({})
  const [justLiked , setJustLiked] = useState({})
  const { data: blogs, isLoading, isError } = useQuery(
    { 
      queryKey: ["blogs"], 
      queryFn: fetchBlogData, 
      staleTime: 20000 
    }
  )
   const likeMutation = useMutation({
      mutationFn:async(blogId)=>{
       
        try {
          console.log("Calling Like api")
           const res = await api.post(`/v1/users/like-blog`,
          //  const res = await axios.post(`${API_BASE_URL}/v1/users/like-blog`,
          //  const res = await axios.post(`http://localhost:5000/api/v1/users/like-blog`,
           {
             id:blogId
           },
           { 
             withCredentials:true,
              validateStatus: function (status) {
            return status >= 200 && status < 300; 
          },
           })
           console.log("Received res of liked api"+res)
           
           if (!res.data?.success) {
         throw new Error('Like failed');
       }
           return res.data
           
       
        } catch (error) {
          throw error
          
        }
      },
      
    })
   
  const handleLikedBlogs=(e, blogId)=>{
    e.stopPropagation()
    
    
        setJustLiked((prev) => ({ ...prev, [blogId]: true }));
      setTimeout(() => {
        setJustLiked((prev) => ({ ...prev, [blogId]: false }));
      }, 1000);
      
      likeMutation.mutate(blogId,{
        onSuccess:()=>{
        toast.success("Blog added to liked list")
       
      },
      onError:(error)=>{
        toast.error(
      error?.response?.status === 401
        ? "Please login first to like"
        : "Something went wrong"
    );
      }
      })

    }
    



    
   
    

  const navigate = useNavigate()
  const handleNavigate = (id) => {
    navigate(`/blog/${id}`)
  }
  const handleNavigateToUserProfile = (id)=>{
    const token = localStorage.getItem("userId")
    token===id?(navigate(`/profile/${id}`)):(navigate(`/author/${id}`))
  }


  return (
    <>
      {isError && <h1 className='font-light flex flex-col items-center text-center sm:ml-50 md:ml-0 text-4xl md:text-5xl'>Error while Loading blog data</h1>}
      {
//         isLoading ? (
//           <div className="loading-container ">
//             <img src={loadinggif} alt="Loading..." className="loading-gif" style={{ color: 'white' }} />
//           </div>
//         ) : (
//           blogs &&
//           blogs.map(item => (

// <>
//             <div className='p-5 flex flex-col cursor-pointer w-[30%] min-w-[280px] h-auto items-start  rounded-2xl bg-gray-100'  key={item?._id}>
// <div onClick={() => handleNavigate(item?._id)} >
//               {/* // <div className='mb-5 break-inside-avoid border bg-gray-300 p-4 rounded-lg shadow-md' onClick={() => handleNavigate(item?._id)} key={item?._id}> */}
//               <div className="m-1 p-1 w-full " >
//                 <img src={item.blogImg} alt="" className='p-2 w-full h-50 border-3 border-gray-300 rounded-tl-3xl rounded-br-3xl object-cover' />
//               </div>
//               <hr className='w-[100%] text-gray-700' />
//               <div className=' mt-2 p-2 rounded-3xl text-4xl font-medium text-gray-500 '>{item.title.split(' ').slice(0, 4).join(' ')}...</div>
//               {/* <div className='my-2 p-2 text-black text-lg font-sans'>
//                 {item.content.split(' ').slice(0, 15).join(' ')}...
//               </div> */}
//               <div className="my-2 p-2 text-black text-lg font-sans"
//                 dangerouslySetInnerHTML={{ __html: item.content.split(' ').slice(0, 20).join(' ') }} />

//               </div>
//               <div className="flex gap-2 " onClick={()=>handleNavigateToUserProfile(item?.authorId?._id)}>
//                 <img src={item?.authorId?.avatar} alt="" className='w-10 h-10 border-1 rounded-[100%]' />
//                 <span className='p-2 bg-gray-900 text-white rounded-3xl' >Created by:- <span className='font-medium'>{item.authorId?.username}</span></span>

//               </div>
//             </div>
//               </>
//           ))
//         )


  isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <img src={loadinggif} alt="Loading..." className="w-20 h-20" />
    </div>
  ) : (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-4">
      {blogs?.map((item) => (
        <div
          key={item?._id}
          onClick={() => handleNavigate(item?._id)}
          className="relative group mb-6 break-inside-avoid overflow-hidden rounded-3xl shadow-md bg-white transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        >
         

          {/* Image */}
          <img
            src={item.blogImg}
            alt="Blog Thumbnail"
            className="w-full object-cover h-auto rounded-t-3xl"
            />
            {/* Like Button */}
          <div
           onClick={(e)=>handleLikedBlogs(e,item?._id)}
           className='absolute top-1 right-0 z-10 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity bg-opacity-60  px-3 py-1 w-15 h-15'>
            <FaHeart className={`text-2xl transition-colors duration-500 ${justLiked[item?._id]?'text-pink-700':'text-white'}` }
                     title={justLiked[item._id] ? "Unlike" : "Like"}
            />
           

       
          </div>

          



          <div className="p-4 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 leading-tight">
              {item.title.split(' ').slice(0, 6).join(' ')}...
            </h2>

            <div
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{
                __html: item.content.split(' ').slice(0, 20).join(' '),
              }}
            />

            
            <div
              className="flex items-center gap-3 mt-4"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToUserProfile(item?.authorId?._id);
              }}
            >
              <img
                src={item?.authorId?.avatar}
                alt="Author"
                className="w-9 h-9 rounded-full object-cover border border-gray-300"
              />
              <div className="text-xs bg-gray-900 text-white px-3 py-1 rounded-full">
                Created by: <span className="font-medium">{item.authorId?.username}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
      }
    </>
  )
}

export default Card
