import React, { useEffect } from 'react'
import "./Blog.css"
import { useNavigate, useParams } from 'react-router-dom'
import loadinggif from '../assets/loading-gif.gif'
import profIcon from "../assets/images/profileIcon.png"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Geovideo from "../assets/Geography_video.mp4"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const blogData=async (id) =>{
  if(!id) console.log("Id is not available")
   
         const res= await axios.post(`${API_BASE_URL}/v1/users/blog-page-data`,
         
          {
            "id":id
          }
        )
        
    return res.data?.data
         
        
    }
    // const BlogData=blogs.find(blog=>{
      //     blog._id===id
  // })
  // setBlogPageData(BlogData)
  
function Blog() {
  const { id }=useParams()
  
  const {data:blog, isLoading, isError} = useQuery(
    {
      queryKey:["blog",id], 
      queryFn:({queryKey})=>blogData(queryKey[1]),
      staleTime:20000
    }       //queryFn take queryKey as parameter 
  )

  // const [isLoading, setLoading] = useState(false)
  // const [blog,setBlog]=useState(null)
    useEffect(()=>{
        window.scrollTo(0, 0)
      
    },[])
    const navigate = useNavigate()
    const handleNavigateToUserProfile = (id)=>{
    const token = localStorage.getItem("userId")
    token===id?(navigate(`/profile/${id}`)):(navigate(`/author/${id}`))
  }
    

   
    
    return (
      <>
  {isError && (
    <h1 className='font-light flex flex-col items-center text-center m-3 p-3 sm:ml-50 md:ml-0 text-4xl md:text-5xl'>
      Error while Loading blog
    </h1>
  )}

  {isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <img src={loadinggif} alt="Loading..." className="w-20 h-20" />
    </div>
  ) : blog && (
    <>
      {/* 🔥 Hero Section with Video Background */}
      <div className="relative w-full h-full md:h-[91vh]  overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={blog?.coverVideo || Geovideo}
          autoPlay
          muted
          loop
        />

        {/* Overlay (dark gradient or glass) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/1 z-10" />

        {/* Text & Image Overlaid on Video */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between h-full md:h-full px-10 py-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold">
              {blog.title.split(' ').slice(0, 13).join(' ')}...
            </h1>
            <p className="mt-4 text-gray-200 text-lg md:text-xl">
              by <span className="font-semibold">{blog.authorId?.username || "Author"}</span>
            </p>
          </div>

         <div className="relative md:h-80 md:w-[100%] lg:w-[40%] opacity-95 hover:opacity-80  group mt-15 lg:mt-0">
  <img
    src={blog.blogImg}
    alt="Blog"
    className="w-52 h-36 md:w-full md:h-50 lg:h-full object-cover rounded-tl-3xl rounded-br-3xl   border-gray-600 bg-white"
  />
  </div>

        </div>
      </div>

      {/* 📝 Blog Content */}
      <div className="px-8 py-10 max-w-5xl mx-auto text-gray-800">
        <div
          className="text-xl md:text-2xl leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <div
          className="my-10 flex items-center gap-4 "
          
        >
          <img
            src={blog.authorId?.avatar ||profIcon}
            alt="Author"
            className="w-12 h-12 rounded-full border border-gray-300 cursor-pointer"
            onClick={() => handleNavigateToUserProfile(blog?.authorId?._id)}
          />
          <span className="text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
            Created by: <strong>{blog.authorId?.username || "Author"}</strong>
          </span>
        </div>
      </div>
    </>
  )}
</>

  
    )
}

export default Blog