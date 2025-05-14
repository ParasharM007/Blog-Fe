import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import loadinggif from '../assets/loading-gif.gif'
function LikedBlogs() {
    const userId = localStorage.getItem("userId")
    const [isLoggedIn,setIsLoggedIn] = useState(false)

   useEffect(()=>{
   (
  async()=>{

    try {
     const res = await axios.get(`${API_BASE_URL}/v1/users/auth-route`,
    //  const res = await axios.get(`http://localhost:5000/api/v1/users/auth-route`, 
      {withCredentials: true}
     )
     console.log(res.data.data.data)
     setIsLoggedIn(res.data.data.data)
     
     
   } catch (error) {
     console.log("Error in fetching nav items")  
     setIsLoggedIn(false) 
   }
  }
   )()
  },[userId])
    const fetchLikedBlogs = async()=>{
        // const res = await axios.get(`http://localhost:5000/api/v1/users/all-liked-blogs`,
        const res = await axios.get(`${API_BASE_URL}/v1/users/all-liked-blogs`,
            {
                withCredentials:true,
                validateStatus: function (status) {
        return status >= 200 && status < 300; // Only 2xx will pass
      },
            }
        )
        return res.data?.data
    }
    
    const { data:blogs , isLoading , isError }= useQuery({
        queryKey:userId,
        queryFn: fetchLikedBlogs,
    
    })



    const dislikeMutation = useMutation({
      mutationFn:async(id)=>{
        // const res = await axios.post(`${API_BASE_URL}/v1/users/dislike-blog`,{},
        const res = await axios.post(`${API_BASE_URL}/v1/users/dislike-blog`,
        {
          id
        },
        { 
          withCredentials:true
        })
        return res.data
        
      },
       onSuccess:()=>{
        toast.success("Blog removed from liked list")
       
      },
      onError:()=>{
        toast.error("Couldn't removed like")
      }
    })
    const handleDislikeBlog=(e,blogId)=>{
        
        
        
        dislikeMutation.mutate(blogId)
    }

    //       {
    
    //   isLoading ? (
    //     <div className="flex justify-center items-center h-screen">
    //       <img src={loadinggif} alt="Loading..." className="w-20 h-20" />
    //     </div>
    //   ) : (
  return (
     <>
          {/* {isError && <h1 className='font-light flex flex-col items-center text-center sm:ml-50 md:ml-0 text-4xl md:text-5xl'>Error while Loading blog data</h1>} */}
       { isLoggedIn?(

        
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-4">
          {blogs?.map((item) => (
            <div
              key={item?._id}
            //   onClick={() => handleNavigate(item?._id)}
              className="relative group mb-6 break-inside-avoid overflow-hidden rounded-3xl shadow-md bg-white transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
             
    
              {/* Image */}
              <img
                src={item.blogImg}
                alt="Blog Thumbnail"
                className="w-full object-cover h-auto rounded-t-3xl"
                />
                {/* Save Button */}
                 <button
                           
                           className='absolute top-1 right-1 z-10 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity bg-opacity-60  px-1 py-1 w-15 h-15
                           bg-white rounded-tr-3xl cursor-pointer'>
                            <div className={`text-md` } onClick={(e)=>handleDislikeBlog(e,item?._id)}
                                     title="Unlike"
                            >Unlike</div>
                            </button>
             
             
    
    
              {/* Content */}
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
    
                {/* Author Info */}
                {/* <div
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
                </div> */}
              </div>
            </div>
          ))}
        </div>
        ):
        (
            <h1 className='font-light flex flex-col items-center text-center sm:ml-50 md:ml-0 text-4xl md:text-5xl'>Please Login first to see liked blogs</h1>
        )
          }
      
        </>
  )
}

export default LikedBlogs