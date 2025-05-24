import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Edit.css"
import loadinggif from '../assets/loading-gif.gif'
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../utils/api_Interceptor';
function Edit() {
  const navigate=useNavigate()
  const { id }= useParams()
  // const [blog, setBlog] =useState(null)
  // const [isLoading,setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("")
  const [image, setImage] = useState(null);
  const [video, setVideo]= useState("")
  const [heading, setHeading] = useState('')
  const [content,setContent] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId=localStorage.getItem('userId');

  
  const handleContentChange = (value) => {
    setContent(value); 
  };
  const handleHeadingChange=(e)=>{
    setHeading(e.target.value);
    
    
  }
  const handleNavigate=()=>{
    navigate(`/profile/${userId}`)
    
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file)
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      reader.onerror = () => {
        console.error('Error reading file:', reader.error);
        alert('Failed to read the file. Please try again with a valid image.');
      };
      reader.readAsDataURL(file);
    }
  };
  
  const mutation = useMutation({mutationFn: async ()=>{
    // const res= await axios.post(`${API_BASE_URL}/v1/users/update-blog`,
    const res= await api.post(`/v1/users/update-blog`,
      {
        title:heading,
        content:content,
        blogId: id
      },
        {
        withCredentials:true,
      },
    )
    return res.data?.data

  }})
  const handleContentSubmit=(e)=>{
      //api to edit content
    e.preventDefault();
    mutation.mutate({},
      {
        onSuccess:()=>{
          toast.success("Blog updated successfully")
          console.log("Blog updated successfully")
          navigate('/')
          // setTimeout(() =>{
          //   window.location.reload();
          
          // },3000)
        },
        onError:(err)=>{
          toast.error("Failed to Edit blog content")
          console.log("Failed to Edit blog content"+err)
        },
        
        
      }
    )
    
  }

  const mutation2 = useMutation({
    mutationFn:async (formData)=>{
            // const res= await axios.post(`${API_BASE_URL}/v1/users/update-blog-img`,
            const res= await api.post(`/v1/users/update-blog-img`,
     formData,
        {
        withCredentials:true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      },
        

        
      )
      return res.data;
    },
    
  })

  const videoUplaod = useMutation({
    mutationFn:async(formData)=>{
       const res = await api.post(`/v1/users/update-cover-video`,
      //  const res = await axios.post(`http://localhost:5000/api/v1/users/update-cover-video`,
        formData,
        {
          withCredentials:true
        }
      )
      return res.data
    }
  })

  const handleVideoChange=(e)=>{
    // const selectedVideo = e.target?.files[0]
    // if(selectedVideo)
    //   setVideo(selectedVideo)
    //   console.log('Video set to state')
     const file = e.target.files[0];
    if (file) {
      setVideo(file)
      const reader = new FileReader();
      reader.onload = () => {
        setVideoPreview(reader.result); // Set the video preview
        // console.log(reader.result)
        console.log(reader.readAsDataURL)
      };
      reader.onerror = () => {
        console.error('Error reading file:', reader.error);
        alert('Failed to read the file. Please try again with a valid image.');
      };
      reader.readAsDataURL(file);
    }
    
  }
  
  const handleVideo =async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    if(video && id){
      console.log("Video available ")
      formData.append("blogId",id)
      formData.append("coverVideo",video)
    }

  videoUplaod.mutate(formData,{
    onSuccess:()=>{
      console.log("Updating cover video")
      toast.success("Cover Video updated successfully")
    },
    onError:(formData)=>{
      toast.error("Failed to upload cover video")
      console.log(formData)
    }
  })

  }

  const handleImagePreviewSubmit=async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("blogImg",image)
    formData.append("blogId",id);

    mutation2.mutate({formData},
      {
        onSuccess:()=>{
          toast.success("Blog image updated!")
          console.log("Blog image updated!")
          // setTimeout(() =>{
          //   window.location.reload();
          
          // },3000)
        },
        onError:()=>{
          toast.error("Failed to update blog image");
          console.log("Failed to update blog image")
        }
      }
    )
  }

  const {data:blog,isLoading } = useQuery({
   queryKey:["blog", id] ,
   queryFn:async ({queryKey})=>{
    const res = await  axios.post(`${API_BASE_URL}/v1/users/blog-page-data`,
      {
        "id":queryKey[1]
      }
    )
    return res.data?.data

   }
  })
       useEffect(() => {
       try {
         if (blog) {
           setImagePreview(blog?.blogImg);
           setVideoPreview(blog?.coverVideo)
           setHeading(blog?.title)
           setContent(blog?.content)
          }
       } catch (error) {
        console.log("Error while loading blog data into edit part "+error)
       }
      }, [blog]); 

       
  return (
    <div className="flex justify-center items-center">

    <div className='m-2 p-2 md:m-5 md:p-5 flex flex-col items-start w-full md:w-[80%] lg:w-[60%] shadow-2xl'>
       <div className='flex justify-between items-center w-full'>
        <div className="m-2 font-light text-3xl md:text-4xl">Blog Editor</div>
     <div className="p-1 cursor-pointer flex gap-2 items-center bg-purple-600 text-white rounded-xl" onClick={handleNavigate}>
     <MdArrowBack className='text-xl lg:text-3xl'/> 
      <button className='text-lg lg:text-xl cursor-pointer'
           
      >Back</button>
                                                      </div>
      </div>
      <form onSubmit={handleImagePreviewSubmit}>

      <div className='m-2 p-2  md:m-2 text-3xl text-gray-500 font-medium'>
        Edit Blog-Image
      </div>
      <input type="file"
            name="blogimage" 
            id="blogimage"
            className='m-2'
            accept="image/*"
            onChange={handleImageChange}
            required
            
            />
             {
             imagePreview ? (
            <div className="ml-10 m-2 p-2 mt-3 flex justify-center items-center w-50 md:w-100 lg:w-150">
              <img src={imagePreview} alt="Preview" className="border-3 border-gray-300 object-cover w-50 h-30 md:w-80 md:h-50 rounded-2xl" />
             {/* <button className='ml-5' disabled={mutation2.isLoading} type='submit'>{!mutation2.isLoading?"Edit Blog image":console.log(mutation2.isLoading)}</button> */}
             <div>

             {/* <button className='ml-5' type='submit'>Edit Blog Img</button> */}
             <button className='bg-[#D95D39] hover:bg-[#b34b2e] text-sm lg:text-xl text-white w-full mx-5 py-1 px-2 lg:px-0 lg:mx-2 rounded-lg font-medium cursor-pointer' type='submit'>{!mutation2.isPending?"Edit Blog Img":"Editing Blog Img..."}</button>
             </div>
            </div>
          ):(
            <>
            <div className='m-2 p-2 text-2xl md:text-3xl text-gray-500 font-medium'>Loading Image Preview...</div>
            </>
          )}
                   </form>
      <form onSubmit={handleVideo}>

      <div className='m-2 p-2  md:m-2 text-3xl text-gray-500 font-medium'>
        Edit Cover Video
      </div>
      
      <input type="file"
            name="coverVideo" 
            id="coverVideo"
            className='m-2'
            accept="video/*"
            onChange={(e)=>handleVideoChange(e)}
            required
            
            />
              {
             videoPreview ? (
            !videoUplaod.isPending ? (
            <div className="ml-10 m-2 p-2 mt-3 flex justify-center items-center w-50 md:w-100 lg:w-150">
              <video src={videoPreview} alt="Preview" className="border-3 border-gray-300 object-cover w-50 h-30 md:w-80 md:h-50 rounded-2xl" />
             <div>

             
             <button className='bg-[#D95D39] hover:bg-[#b34b2e] text-sm lg:text-xl text-white w-full mx-5 py-1 px-2 lg:px-0 lg:mx-2 rounded-lg font-medium cursor-pointer' type='submit'>Edit Cover Video</button>
             </div>
            </div>)
            
            :(
              <div className="ml-10 m-2 p-2 mt-3 flex justify-center items-center w-[70%] md:w-100 lg:w-150">
              <div className=" flex flex-col items-center border-3 bg-gray-300  border-gray-300 object-cover w-50 h-30 md:w-80 md:h-50 rounded-2xl" >
                <b>
                  It may take few minutes to compress&upload video.
                  </b>
                
             <img src={loadinggif} alt="Loading..." className="w-10 h-10 md:w-20 md:h-20" />
           
                
              </div>
             
             <div>

             {/* <button className='ml-5' type='submit'>Edit Blog Img</button> */}
             <button className='bg-[#D95D39] hover:bg-[#b34b2e] text-sm lg:text-xl text-white w-full mx-5 py-1 px-2 lg:px-0 lg:mx-2 rounded-lg font-medium cursor-pointer' type='submit'>Editing Cover Video...</button>
             </div>
            </div>

            )
          ):(
            <>
            <div className='m-2 p-2 text-2xl md:text-3xl text-gray-500 font-medium'>Loading Video Preview...</div>
            </>
          )}
            
             {/* <button className='ml-5' type='submit'>Edit Blog Img</button> */}
             {/* <button className='bg-[#D95D39] hover:bg-[#b34b2e] text-sm lg:text-xl text-white w-[70%] md:w-full mx-5 py-1 px-2 lg:px-0 lg:mx-2 rounded-lg font-medium cursor-pointer' type='submit'>{!videoUplaod.isPending?"Edit Cover Video":"Editing Cover Video..."}</button> */}
      </form>
             
           
         
      <form onSubmit={handleContentSubmit}>

      <div className='m-2 p-2 md:m-2 text-3xl text-gray-500 font-medium '>Heading</div>
      <div className="md:m-2 p-2 w-200">
        <input 
          type="text" 
          placeholder="Enter blog title..." 
          className="md:m-2 outline-none text-2xl w-[38%] md:w-[70%] p-1 text-gray-700 border-gray-300 border rounded-xl" 
          value={isLoading?"Loading heading...":heading}
          onChange={handleHeadingChange}
          />
      </div>
      <div className="md:m-2 md:p-2">
      <div className='my-4 text-3xl text-gray-500 font-medium'>Content</div>
        <ReactQuill 
          value={isLoading?"Loading blog...":content} 
          onChange={handleContentChange} 
          theme="snow"
          placeholder="Write your blog content here..."
          // className='w-70 md:w-100 lg:w-148 text-4xl border-gray-300 border'
          className='w-[38%] md:w-[70%]  text-4xl border-gray-100 border'
          
          />
      </div>
      <button className='text-lg lg:text-xl cursor-pointer m-4 p-1 w-20 bg-green-700 rounded-2xl text-white' type='submit'>{mutation.isPending?"Saving...":"Save"}</button>
          </form>
        
          </div>
    </div>
  )
}

export default Edit