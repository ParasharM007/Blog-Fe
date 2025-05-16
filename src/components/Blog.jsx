import React, { useEffect } from 'react'
import "./Blog.css"
import { useNavigate, useParams } from 'react-router-dom'
import loadinggif from '../assets/loading-gif.gif'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'


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
      //  const blogData=async()=>{
      //   if(!id) console.log("Id is not available")
      //      try {
      //         setLoading(true)
      //          const res= await axios.post(`${API_BASE_URL}/v1/users/blog-page-data`,
      //           {
      //             "id":id
      //           }
      //         )
      //         if(res.status===200){
      //           setBlog(res.data?.data)
      //           // console.log("Fetched Blog Data: "+res.data?.data)
      //         }
              
      //       } catch (error) {
      //           console.log("Error while loading blog data: "+error )
      //       }
      //       finally{
      //          setLoading(false)

      //      }

      //  }
      //   // const BlogData=blogs.find(blog=>{
      //   //     blog._id===id
      //   // })
      //   // setBlogPageData(BlogData)
      //   blogData();
    },[])
    const navigate = useNavigate()
    const handleNavigate= (id)=>{
      navigate(`/author/${id}`)

    }
    

   
    
    return (
      <>
      {isError && <h1 className='font-light flex flex-col items-center text-center m-3 p-3 sm:ml-50 md:ml-0 text-4xl md:text-5xl'>Error while Loading blog</h1>}
         {
           isLoading ? (
             <> <div className="flex justify-center items-center h-[80vh]">
                   <img src={loadinggif} alt="Loading..." className="w-20 h-20" />
                 </div> </>
                ) : (
                  blog && <>
                    
                    <div>
                    {/* <div className='btns'>
                        
                        <button className='edit'>Edit</button>
                        <button className='del'>Delete</button>
                        </div> */}
                        <div className='relative h-auto'>
                        
                        <div className='md:flex justify-between items-center'>
                          <div className="m-10 text-5xl md:text-7xl">

                        {/* <h1 className="text-3xl">{blog.title ||"Blog Title"}</h1> */}
                        <h1 className="font-medium text-gray-700 ">{blog.title.split(' ').slice(0, 2).join(' ') ||"Blog Title"}</h1>
                        <h1 className="font-medium text-gray-400">{blog.title.split(' ').slice(2, 7).join(' ')}</h1>
                        <h1 className="font-medium text-gray-700">{blog.title.split(' ').slice(7, 20).join(' ')}</h1>
                          </div>
                        <img src={blog.blogImg} alt="image" className='m-10 p-2 bg-gray-200 w-60 h-40 md:w-90 md:h-60 lg:w-220 lg:h-100 border rounded-tl-3xl rounded-br-3xl object-cover' />
                        </div>
                        <div className="m-10">
                        {/* <div className='text-3xl md:text-4xl text-gray-500'>{blog.content ||"Blog content is not available"} */}
                        <div className='text-3xl md:text-4xl text-gray-500' dangerouslySetInnerHTML={{ __html: blog.content }}/>
                     <div className="my-5 gap-3 flex" onClick={()=>handleNavigate(blog?.authorId?._id)}>
                              <img src={blog.authorId?.avatar} alt="" className='w-12 h-12 rounded-[50%] border-5 border-gray-200' />
                             <span className='p-2 border-5 border-gray-200  text-gray-600 rounded-3xl'>Created by:- <span className=' font-medium'>{blog.authorId?.username ||"Author-name"}</span></span>
                    
                             </div>
                </div>
                
                </div>
                </div>
            
                </>
            )}
            </>
  
    )
}

export default Blog