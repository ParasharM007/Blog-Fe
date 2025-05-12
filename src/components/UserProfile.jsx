import React, { useEffect, useState } from 'react'
import "./MyPost.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import loadinggif from '../assets/loading-gif.gif'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;





function UserProfile() {
    const {id} = useParams()
    
    const fetchPosts =async (id)=>{
      const res= await axios.post(`${API_BASE_URL}/v1/users/user-profile`,
      // const res= await axios.post(`${API_BASE_URL}/v1/users/user-posts`,
         {id},
         {
           withCredentials: true
    
         }
       )
       return res.data?.data
      }

    const {data  , isLoading, isError } = useQuery({
      queryKey:["UsersPosts",id],
      queryFn: ({queryKey})=> fetchPosts(queryKey[1]),
      staleTime:20000
    })

  

    const navigate=useNavigate()
    const handleNavigate=(id)=>{
        navigate(`/blog/${id}`)
        
       }
     

 return (
    <>

 {isLoading?(
     <> <div className="loading-container">
                          <img src={loadinggif} alt="Loading..." className="loading-gif" style={{ color: 'white' }} />
                        </div> </>
    ):(
        
        
        
        <>
       
       {data &&  
         <div className='flex items-center justify-center  m-2 p-2 gap-4 md:gap-12'>
         <div className="mt-15">
         <div >
         <img src={data?.avatar} alt="pfp" className="rounded-[100%] w-40 h-40 md:w-50 md:h-50"/>
          </div>
          <div className="m-3 p-1 md:text-5xl text-4xl font-light">{data?.username || "username"}</div>
        </div>
        <div className="">
          <div className="flex flex-col gap-2  text-md md:text-xl ">
            <div>{data?.fullName || "Full Name"}</div>
            <div>{data?.email || "user-email"}</div>
            <div>Joined at:- { new Date(data?.createdAt).toLocaleDateString()|| "date of joining"}</div>
              
          </div>
         
        </div>
    </div>
 }
        </>
     )
    
    }






    
     <div className='m-2.5 p-2.5 flex flex-col items-center'>

    {
      isError &&
      
       ( <div className='font-light flex flex-col items-center text-center sm:ml-50 md:ml-0 text-4xl md:text-5xl'>Error in loading User's Posts</div>)}

       {data?.blogs && data?.blogs.map(post=>(
           
           <div className='m-2  md:150 w-90 lg:w-250 h-auto relative bg-gray-50 rounded-xl md:border-gray-300 md:border cursor-pointer' key={post._id}>

             <div className='flex  gap-3 m-5 justify-center md:mr-10 md:justify-end'>
            


</div>

        <div className='md:m-2 md:p-4 max-w-260' onClick={()=>handleNavigate(post._id)}>
            <div className="md:m-3 md:p-3">
                <img src={post.blogImg} alt="" className='bg-gray-200 p-1 m-3 w-50 h-50 md:w-60 md:h-60 rounded-tl-[30%] rounded-br-[30%]' />
            </div>
            <div className="md:m-3 md:p-3">
                <div className='my-4 md:m-2 md:p-2 font-medium text-2xl'>{post.title}</div>
                {/* <div className="post-desc">{post.content}</div> */}
                <div className="md:m-2 md:p-2 text-gray-500 line-clamp-8" 
     dangerouslySetInnerHTML={{ __html: post.content }} />
                        <div className="my-2 md:p-1 md:m-2 ">
                            <span className='p-1 mr-2 bg-green-700 text-white w-23 h-10 text-center rounded-2xl'>Created at: </span>
                            {/* {post.createdAt} */}
                            {post.createdAt? new Date(post?.createdAt).toLocaleDateString():"No Date available" }
                            
                        </div>
            </div>
        </div>
    </div>

)
)
}
</div>


</>
)
}

export default UserProfile