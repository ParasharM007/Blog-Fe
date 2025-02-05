import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Edit.css"
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Edit() {
  const navigate=useNavigate()
  const { id }= useParams()
  const [blog, setBlog] =useState(null)
  const [isLoading,setLoading] = useState(false)
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

  const handleContentSubmit= async (e)=>{
    e.preventDefault();
    try {
      //api to edit content
      const res=await axios.post(`${API_BASE_URL}/v1/users/update-blog`,
      {
        title:heading,
        content:content,
        blogId: id
      },
        {
        withCredentials:true,
      },
        

        
      )
      if(res.status===200){
        toast.success("Blog updated successfully")
        console.log("Blog updated successfully")
        setTimeout(() =>{
          window.location.reload();
        
        },3000)
      }

    } catch (error) {
      toast.error("Failed to Edit blog content")
      console.log("Failed to Edit blog content")
    }
    
  }

  const handleImagePreviewSubmit=async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("blogImg",image)
    formData.append("blogId",id);
    try {
      const res=await axios.post(`${API_BASE_URL}/v1/users/update-blog-img`,
       formData,
          {
          withCredentials:true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
          
  
          
        )
        if(res.status===200){
          toast.success("Blog image updated!")
          console.log("Blog image updated!")
          setTimeout(() =>{
            window.location.reload();
          
          },3000)
        }
      
    } catch (error) {
      toast.error("Failed to update blog image");
      console.log("Failed to update blog image")
    }

  }

  useEffect(()=>{
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
           blogData();
       },[id])
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
    <div className="edit-container">

    <div className='edit-cont'>
       <div className='edit-headng'><div className="edit-head">Blog Editor</div>
     <div className='back'>
     <MdArrowBack style={{backgroundColor:'blueviolet',
                                                        fontSize:'30px',
                                                        // marginRight:'5px'
                                                      }}/> 
      <button className='back-btn'
              onClick={handleNavigate}
      >Back</button>
                                                      </div>
      </div>
      <form onSubmit={handleImagePreviewSubmit}>

      <div style={{fontSize:'30px',
                   margin:'5px',
                   padding:'5px'
      }}>
        Edit Blog-Image
      </div>
      <input type="file"
            name="blogimage" 
            id="blogimage"
            className='blogimage'
            accept="image/*"
            onChange={handleImageChange}
            required
            
            />
             {
             imagePreview ? (
            <div className="image-preview-container">
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <button style={{marginLeft:"10px"}}>Edit Blog image</button>
            </div>
          ):(
            <>
            <div style={{fontSize:'20px',
                   margin:'5px',
                   padding:'5px'}}>Loading Image Preview</div>
            </>
          )}
                   </form>
      <form action="submit" onSubmit={handleContentSubmit}>

      <div style={{fontSize:'30px',
                   margin:'5px',
                   padding:'5px'
                  }}>Heading</div>
      <div className="blog-heading">
        <input 
          type="text" 
          placeholder="Enter blog title..." 
          className="blog-title-input" 
          value={heading}
          onChange={handleHeadingChange}
          />
      </div>
      <div className="blog-description">
      <div style={{fontSize:'30px',
                   margin:'5px',
                   padding:'5px'
      }}>Content</div>
        <ReactQuill 
          value={content} 
          onChange={handleContentChange} 
          theme="snow" // Quill theme
          placeholder="Write your blog content here..."
          className='quill-edit'
          />
      </div>
      <button className='save-btn' type='submit'>Save</button>
          </form>
        
          </div>
    </div>
  )
}

export default Edit