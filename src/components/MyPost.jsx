import React, { useEffect, useState } from 'react'
import "./MyPost.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
function MyPost() {
    const [myPosts,setMyPosts]=useState([])
    const [date,setDate] = useState([])
    const [err,setErr] = useState(false)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const fetchPosts =async ()=>{
      
      try {
  
       const res= await axios.post(`${API_BASE_URL}/v1/users/my-posts`,
          {},
          {
            withCredentials: true
  
          }
        )
        if(res.status===200){
          setMyPosts(res.data?.data)
          
          function arrayDate(){
        
            const createdAt = res.data.data?.map(item=>(item.createdAt))
            const date = new Date(createdAt);
            
            // Format to display only the date (YYYY-MM-DD)
            setDate(date.toLocaleDateString());
          }
          

          
        }
      } catch (error) {
        setErr(true)
        
        
      }
    }
    useEffect(()=>{
      fetchPosts();
    },[])


    const navigate=useNavigate()
    const handleNavigate=(id)=>{
        navigate(`/blog/${id}`)
        
       }
       const handleEdit=(id)=>{
        navigate(`/edit/${id}`)
       }
       const handleDelete=async(id)=>{
          try {
            const res= await axios.post(`${API_BASE_URL}/v1/users/delete-post`,
                {
                    id : id
                },
                {
                  withCredentials: true
        
                }
              )
              if(res.status===200){
                
               
                toast.success("Blog deleted successfully")
               window.location.reload();
                
              }
          } catch (error) {
            toast.error("Failed to delete blog");
            console.log("Failed to delete blog "+error);
          }
       }
    return (<>
    {
       err?(<div className='err-head'>Create your first Blog</div>):myPosts.map(post=>(
            
            <div className='cont' key={post._id}>

             <div className='btns'>

<button className='edit' onClick={()=>handleEdit(post._id)}>Edit</button>
<button className='del' onClick={()=>handleDelete(post._id)}>Delete</button>
</div>
        <div className='post' onClick={()=>handleNavigate(post._id)}>
            <div className="left-part">
                <img src={post.blogImg} alt="" className='post-img' />
            </div>
            <div className="right-part">
                <div className='post-head'>{post.title}</div>
                <div className="post-desc">{post.content}</div>
                        <div className="creat">
                            Created at: {date.map(item=>(item.Date || item.Created))}
                        </div>
            </div>
        </div>
    </div>
))
}
    </>
)
}

export default MyPost