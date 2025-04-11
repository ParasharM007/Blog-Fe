import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Edit.css"
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
function Edit() {
  const navigate=useNavigate()
  const { id }= useParams()
  // const [blog, setBlog] =useState(null)
  // const [isLoading,setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const [heading, setHeading] = useState('')
  const [content,setContent] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId=localStorage.getItem('userId');

  
  const handleContentChange = (value) => {
    setContent(value); // Update the state when the content changes
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
    const res= await axios.post(`${API_BASE_URL}/v1/users/update-blog`,
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
    mutationFn:async ({formData})=>{
            const res= await axios.post(`${API_BASE_URL}/v1/users/update-blog-img`,
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

  const {data:blog } = useQuery({
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
           setHeading(blog?.title)
           setContent(blog?.content)
          }
       } catch (error) {
        console.log("Error while loading blog data into edit part "+error)
       }
      }, [blog]); 

       
  return (
    <div className="flex justify-center items-center">

    <div className='m-2 p-2 md:m-5 md:p-5 flex flex-col border items-start w-full md:w-[80%] lg:w-[60%]'>
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
            <div className="ml-8 m-2 p-2 mt-3 flex justify-center items-center w-50 md:w-100 lg:w-150">
              <img src={imagePreview} alt="Preview" className="border-3 border-gray-300 object-cover w-50 h-30 md:w-80 md:h-50 rounded-2xl" />
             {/* <button className='ml-5' disabled={mutation2.isLoading} type='submit'>{!mutation2.isLoading?"Edit Blog image":console.log(mutation2.isLoading)}</button> */}
             <button className='ml-5' type='submit'>Edit Blog Img</button>
            </div>
          ):(
            <>
            <div className='m-2 p-2 text-2xl'>Loading Image Preview...</div>
            </>
          )}
                   </form>
      <form action="submit" onSubmit={handleContentSubmit}>

      <div className='m-2 p-2 md:m-2 text-3xl text-gray-500 font-medium '>Heading</div>
      <div className="md:m-2 p-2 w-200">
        <input 
          type="text" 
          placeholder="Enter blog title..." 
          className="m-2 outline-none text-2xl md:w-100 p-1 text-gray-700 border-gray-300 border rounded-xl" 
          value={heading}
          onChange={handleHeadingChange}
          />
      </div>
      <div className="m-2 p-2">
      <div className='my-4 text-3xl text-gray-500 font-medium'>Content</div>
        <ReactQuill 
          value={content} 
          onChange={handleContentChange} 
          theme="snow" // Quill theme
          placeholder="Write your blog content here..."
          className='w-70 md:w-100 lg:w-148 text-4xl border-gray-300 border'
          />
      </div>
      <button className='text-lg lg:text-xl cursor-pointer mx-4 p-1 w-20 bg-green-700 rounded-2xl text-white' type='submit'>Save</button>
          </form>
        
          </div>
    </div>
  )
}

export default Edit