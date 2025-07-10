import React, { useContext, useEffect, useState } from 'react'
import './Card.css'
import loadinggif from '../assets/loading-gif.gif'
import profIcon from "../assets/images/profileIcon.png"
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import SaveTag from "../assets/images/3D_Tag.png"
import { FaHeart } from "react-icons/fa"
import { toast } from 'react-toastify'
import api from '../utils/api_Interceptor'
import { AuthContext } from '../utils/AuthContext'
import { useLikeBlog } from '../utils/LikeHook'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fetchBlogData = async () => {
  const res = await axios.get(`${API_BASE_URL}/v1/users/approved-blogs`)
  // const res = await axios.get(`${API_BASE_URL}/v1/users/get-blogs`)
  return res.data?.data;
}


function Card() {
  // const [liked, setLiked] = useState({})
  const { searchBlogs }=useContext(AuthContext)
  const [justLiked , setJustLiked] = useState({})

  const { mutate: likeBlogMutate, isPending, isSuccess } = useLikeBlog();
  

  const { data: blogsFromApi, isLoading, isError,refetch } = useQuery(
    { 
      queryKey: ["blogs",searchBlogs], 
      queryFn: fetchBlogData, 
      staleTime: 20000,
      enabled: !(Array.isArray(searchBlogs) && searchBlogs.length > 0),
    
    }
  )
   const blogs = Array.isArray(searchBlogs) && searchBlogs.length > 0 ? searchBlogs : blogsFromApi;
  const usingSearch = Array.isArray(searchBlogs) && searchBlogs.length > 0;
  
 


  
   
  const handleLikedBlogs=(e, blogId)=>{
    e.stopPropagation()
    
    
        setJustLiked((prev) => ({ ...prev, [blogId]: true }));
      setTimeout(() => {
        setJustLiked((prev) => ({ ...prev, [blogId]: false }));
      }, 1000);
      
    
    likeBlogMutate({ id: blogId, status: true },{
      onSuccess:()=>{
        toast.success("Blog added to liked list")
      },
      onError:(error)=>{
        toast.error(
      error?.response?.status === 401
        ? "Please login first to like"
        : "Something went wrong"
        )
      }}
  )
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
      {!usingSearch && isError && <h1 className='font-light flex flex-col items-center text-center sm:ml-50 md:ml-10 text-4xl md:text-5xl'>Error while Loading blog data...</h1>}
      {
       
   !usingSearch && isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <img src={loadinggif} alt="Loading..." className="w-20 h-20" />
    </div>
  ) : (
    
    
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-4">
       
       {blogs!==null && typeof(blogs)==='object'&& !Array.isArray(blogs) &&(<div className='font-light flex flex-col items-center text-center sm:ml-50 md:ml-0 text-4xl md:text-5xl'>No Blogs Available...</div>)} 
      
      {Array.isArray(blogs) && blogs?.map((item) => (
        <div
          key={item?._id}
          onClick={() => handleNavigate(item?._id)}
          className="relative group mb-6 break-inside-avoid overflow-hidden rounded-3xl shadow-md bg-white transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        >
         

          
          <img
            src={item.blogImg}
            alt="Blog Thumbnail"
            className="w-full object-cover h-auto rounded-t-3xl"
            />
            
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
              // onClick={(e) => {
              //   e.stopPropagation();
              //   handleNavigateToUserProfile(item?.authorId?._id);
              // }}
            >
              <img
                src={item?.authorId?.avatar || profIcon}
                alt="Author"
                className="w-9 h-9 rounded-full object-cover border border-gray-300"
                  onClick={(e) => {
                e.stopPropagation();
                handleNavigateToUserProfile(item?.authorId?._id);
              }}
              />
              <div className="text-xs bg-gray-900 text-white px-3 py-1 rounded-full"
                onClick={(e) => {
                e.stopPropagation();
                handleNavigateToUserProfile(item?.authorId?._id);
              }}
              >
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
