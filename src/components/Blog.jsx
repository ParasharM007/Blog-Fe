import React, { useEffect, useState } from 'react'
import "./Blog.css"
import { useParams } from 'react-router-dom'
import loadinggif from '../assets/loading-gif.gif'
import axios from 'axios'
function Blog() {
    const { id }=useParams()
    const [isLoading, setLoading] = useState(false)
    const [blog,setBlog]=useState(null)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    useEffect(()=>{
        window.scrollTo(0, 0)
       const blogData=async()=>{
        if(!id) console.log("Id is not available")
           try {
              setLoading(true)
               const res= await axios.post(`${API_BASE_URL}/v1/users/blog-page-data`,
                {
                  "id":id
                }
              )
              if(res.status===200){
                setBlog(res.data?.data)
                console.log("Fetched Blog Data: "+res.data?.data)
              }
              
            } catch (error) {
                console.log("Error while loading blog data: "+error )
            }
            finally{
               setLoading(false)

           }

       }
        // const BlogData=blogs.find(blog=>{
        //     blog._id===id
        // })
        // setBlogPageData(BlogData)
        blogData();
    },[id])
    

   
    
    return (
  <>
         {
             isLoading ? (
                 <> <div className="loading-container">
                    <img src={loadinggif} alt="Loading..." className="loading-gif" style={{ color: 'white' }} />
                  </div> </>
                ) : (
                    blog && <>
                    
                    <div>
                    {/* <div className='btns'>
                        
                        <button className='edit'>Edit</button>
                        <button className='del'>Delete</button>
                        </div> */}
                        <div className='blog-container'>
                        
                        <div className='blogimg-container'>
                        <img src={blog.blogImg} alt="image" />
                        </div>
                        <div className="blog-content">
                        <h1 className="title">{blog.title ||"Blog Title"}</h1>
                        <div className='blog-detail'>{blog.content ||"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi error expedita ut. At nemo cumque obcaecati voluptate assumenda dolore porro recusandae? pjrwpkfwjrnfo eojrg;k erohgpoejen o3hrgejn oehripgjela orejpg;jnael oehrjijfherh"}
                    </div>
                     <div className="creator-details">
                              <img src={blog.authorId?.avatar} alt="" className='image' />
                             <span className='created'>Created by:- {blog.authorId?.username ||"Author-name"}</span>
                    
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