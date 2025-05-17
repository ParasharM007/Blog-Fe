import React, { useEffect } from 'react'
import "./Blog.css"
import { useNavigate, useParams } from 'react-router-dom'
import loadinggif from '../assets/loading-gif.gif'
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
    const handleNavigate= (id)=>{
      navigate(`/author/${id}`)

    }
    

   
    
    return (
      // <>
      // {isError && <h1 className='font-light flex flex-col items-center text-center m-3 p-3 sm:ml-50 md:ml-0 text-4xl md:text-5xl'>Error while Loading blog</h1>}
      //    {
      //      isLoading ? (
      //        <> <div className="flex justify-center items-center h-[80vh]">
      //              <img src={loadinggif} alt="Loading..." className="w-20 h-20" />
      //            </div> </>
      //           ) : (
      //             blog && <>
                    
      //               <div>
      //               {/* <div className='btns'>
                        
      //                   <button className='edit'>Edit</button>
      //                   <button className='del'>Delete</button>
      //                   </div> */}
      //                   <div className='relative h-auto'>
                        
      //                   <div className='md:flex justify-between items-center'>
      //                     <div className="m-10 text-5xl md:text-7xl">

      //                   {/* <h1 className="text-3xl">{blog.title ||"Blog Title"}</h1> */}
      //                   <h1 className="font-medium text-gray-700 ">{blog.title.split(' ').slice(0, 2).join(' ') ||"Blog Title"}</h1>
      //                   <h1 className="font-medium text-gray-400">{blog.title.split(' ').slice(2, 7).join(' ')}</h1>
      //                   <h1 className="font-medium text-gray-700">{blog.title.split(' ').slice(7, 20).join(' ')}</h1>
      //                     </div>
      //                   <img src={blog.blogImg} alt="image" className='m-10 p-2 bg-gray-200 w-60 h-40 md:w-90 md:h-60 lg:w-220 lg:h-100 border rounded-tl-3xl rounded-br-3xl object-cover' />
      //                   </div>
      //                   <div className="m-10">
      //                   {/* <div className='text-3xl md:text-4xl text-gray-500'>{blog.content ||"Blog content is not available"} */}
      //                   <div className='text-3xl md:text-4xl text-gray-500' dangerouslySetInnerHTML={{ __html: blog.content }}/>
      //                <div className="my-5 gap-3 flex" onClick={()=>handleNavigate(blog?.authorId?._id)}>
      //                         <img src={blog.authorId?.avatar} alt="" className='w-12 h-12 rounded-[50%] border-5 border-gray-200' />
      //                        <span className='p-2 border-5 border-gray-200  text-gray-600 rounded-3xl'>Created by:- <span className=' font-medium'>{blog.authorId?.username ||"Author-name"}</span></span>
                    
      //                        </div>
      //           </div>
                
      //           </div>
      //           </div>
            
      //           </>
      //       )}
      //       </>

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
              {blog.title.split(' ').slice(0, 6).join(' ')}...
            </h1>
            <p className="mt-4 text-gray-200 text-lg md:text-xl">
              by <span className="font-semibold">{blog.authorId?.username || "Author"}</span>
            </p>
          </div>

         <div className="relative md:w-150 md:h-80 opacity-95 hover:opacity-80  group mt-20 lg:mt-0">
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
          className="my-10 flex items-center gap-4"
          onClick={() => handleNavigate(blog?.authorId?._id)}
        >
          <img
            src={blog.authorId?.avatar}
            alt="Author"
            className="w-12 h-12 rounded-full border border-gray-300"
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