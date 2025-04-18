import React, { useEffect, useState } from 'react'
import "./MyPost.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchPosts =async ()=>{
  const res= await axios.post(`${API_BASE_URL}/v1/users/my-posts`,
     {},
     {
       withCredentials: true

     }
   )
   return res.data?.data
  }
      
  

    
      
      



function MyPost() {
    // const [myPosts,setMyPosts]=useState([])
    // const [date,setDate] = useState([])
    // const [err,setErr] = useState(false)
    // const fetchPosts =async ()=>{
      
    //   try {
  
    //    const res= await axios.post(`${API_BASE_URL}/v1/users/my-posts`,
    //       {},
    //       {
    //         withCredentials: true
  
    //       }
    //     )
    //     if(res.status===200){
    //       setMyPosts(res.data?.data)
          
    //       function arrayDate(){
        
    //         const createdAt = res.data.data?.map(item=>(item.createdAt))
    //         const date = new Date(createdAt);
            
    //         // Format to display only the date (YYYY-MM-DD)
    //         setDate(date.toLocaleDateString());
    //       }
          

          
    //     }
    //   } catch (error) {
    //     setErr(true)
        
        
    //   }
    // }
    // useEffect(()=>{
    //   fetchPosts();
    // },[])

    const [ deletingId, setDeletingId] = useState(null)

    const {data : myPosts , isLoading, isError:err } = useQuery({
      queryKey:["MyPosts"],
      queryFn: fetchPosts,
      staleTime:20000
    })


    const navigate=useNavigate()
    const handleNavigate=(id)=>{
        navigate(`/blog/${id}`)
        
       }
       const handleEdit=(id)=>{
        navigate(`/edit/${id}`)
       }

       const mutation = useMutation({
        mutationFn:async ({id})=>{
          const res= await axios.post(`${API_BASE_URL}/v1/users/delete-post`,
            {
                id : id
            },
            {
              withCredentials: true
    
            }
          )
          return res.data;
        }
       })
       const handleDelete=(id)=>{
            setDeletingId(id);
           mutation.mutate({id},
            {
              onSuccess:()=>{
                toast.success("Blog deleted successfully")
               window.location.reload();
              },
              onError:(error)=>{
                toast.error("Failed to delete blog");
                console.log("Failed to delete blog "+error);
              },
              onSettled:()=>{
                setDeletingId(null)
              }
            }
           )
         
          // try {
          //   const res= await axios.post(`${API_BASE_URL}/v1/users/delete-post`,
          //       {
          //           id : id
          //       },
          //       {
          //         withCredentials: true
        
          //       }
          //     )
          //     if(res.status===200){
                
               
          //       toast.success("Blog deleted successfully")
          //      window.location.reload();
                
          //     }
          // } catch (error) {
          //   toast.error("Failed to delete blog");
          //   console.log("Failed to delete blog "+error);
          // }
       }
      
    return (<>
    {
       err &&(<div className='font-light flex flex-col items-center text-center sm:ml-50 md:ml-0 text-4xl md:text-5xl'>Create your first Blog</div>)}
       {myPosts && myPosts.map(post=>(
            
            <div className='m-2  md:150 w-90 lg:w-250 h-auto relative bg-gray-50 rounded-xl md:border-gray-300 md:border cursor-pointer' key={post._id}>

             <div className='flex  gap-3 m-5 justify-center md:mr-10 md:justify-end'>
            

<button className='bg-green-700 text-white w-15 h-10 rounded-2xl cursor-pointer ' onClick={()=>handleEdit(post._id)}>Edit</button>
{/* <button className='bg-red-700 text-white w-15 h-10 rounded-2xl cursor-pointer' disabled={mutation.isLoading && deletingId === post._id}  onClick={()=>handleDelete(post._id)}>{mutation.isLoading && deletingId === post._id ? "Deleting..." : "Delete"}</button> */}
<button className='bg-red-700 text-white w-15 h-10 rounded-2xl cursor-pointer'  onClick={()=>handleDelete(post._id)}>Delete</button>
</div>

        <div className='md:m-2 md:p-4 max-w-260' onClick={()=>handleNavigate(post._id)}>
            <div className="md:m-3 md:p-3">
                <img src={post.blogImg} alt="" className='bg-gray-200 p-1 m-3 w-50 h-50 md:w-60 md:h-60 rounded-tl-[30%] rounded-br-[30%]' />
            </div>
            <div className="md:m-3 md:p-3">
                <div className='my-4 md:m-2 md:p-2 font-medium text-2xl'>{post.title}</div>
                {/* <div className="post-desc">{post.content}</div> */}
                <div className="md:m-2 md:p-2 text-gray-500 " 
     dangerouslySetInnerHTML={{ __html: post.content }} />
                        <div className="my-2 md:p-1 md:m-2 ">
                            <span className='p-1 mr-2 bg-green-700 text-white w-23 h-10 text-center rounded-2xl'>Created at: </span>
                            {post.createdAt}
                            {/* Created at: {date.map(item=>(item.Date || item.Created || "1/1/2025"))} */}
                            {/* Created at: {post.createdAt? new Date(post.createdAt).toLocaleDateString:"No Date available" } */}
                            
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