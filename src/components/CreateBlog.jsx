import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Edit.css';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/api_Interceptor';
import { toast } from 'react-toastify';
import loadinggif from "../assets/loading-gif.gif"
import { useMutation } from '@tanstack/react-query';

function Edit() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setContent] = useState('');
  const [video, setVideo] = useState("")
  const [videoPreview, setVideoPreview] = useState("")
  const [isLoading, setLoading] = useState(false)
  const toolbarRef =useRef(null)
  // const [cleanedContent,setCleanedContent] =useState('')
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleContentChange = (value) => {

    setContent(value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Update the image state
    const file = e.target.files[0];
    if (file) {
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

  const handleVideoChange = (e) => {
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

  

  const handleNavigate = () => {
    navigate('/');
  };

  const mutation = useMutation({
    mutationFn: async (formData) => {

      // const res = await axios.post(`http://localhost:5000/api/v1/users/create-blog`, formData, {
      const res = await api.post(`/v1/users/create-blog`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
      );
      return res.data;
    }
  })

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // setCleanedContent(content)
    // const plainText = content.replace(/<[^>]+>/g, ''); // Removes all HTML tags
    const formData = new FormData();
    formData.append('title', title);
    // formData.append('content', plainText);
    formData.append('content', content);
    if (image) formData.append('blogImg', image);
    if (video) formData.append("coverVideo", video)
      window.scrollTo(0,0)

    mutation.mutate( formData , {
      onSuccess: () => {
        console.log('Blog created and sent for approval');
        toast.success("Blog created successfully");
        navigate('/');
      },
      onError: (error) => {
        toast.error("Couldn't create blog")
        console.log('Error while creating blog:', error);
      }
    })

    
  };
  
  const scrollToTollbar=()=>{
    toolbarRef.current.scrollIntoView( { behaviour:'smooth'})
  }

  return <>
    {
      
      <>

        <div className="flex justify-center items-center">
          
          <div className="relative  m-2 p-2 md:m-5 md:p-5 flex flex-col items-start w-full md:w-[80%] lg:w-[60%] shadow-2xl">
            <div className="flex justify-between items-center w-full">
              <div className="m-2 font-light text-3xl md:text-4xl ">Create Your Blogs with WildEarth...</div>
              <div className="p-1 cursor-pointer flex gap-2 items-center bg-purple-600 text-white rounded-xl" onClick={handleNavigate}>
                
                <MdArrowBack className='text-xl lg:text-3xl' />
                <button className="text-lg lg:text-xl cursor-pointer" >
                  Back
                </button>
              </div>
            </div>

            <form onSubmit={handleSave}>
              <div>
                <div className='m-2 p-2  md:m-2 text-3xl text-gray-500 font-medium'>
                  Upload Cover Video
                </div>
                <input type="file"
                  name="coverVideo"
                  id="coverVideo"
                  className='m-2'
                  accept="video/*"
                  onChange={(e) => handleVideoChange(e)}
                  required

                />

               
              </div>
              {videoPreview && (
                !mutation.isPending ? (
                
                  <div className="m-2 p-2 mt-3 flex justify-center items-center  w-[30%] md:w-[50%] ">
                    <video 
                    src={videoPreview}
                    alt="Preview" 
                    controls
                    className="object-cover w-50 h-30 md:w-80 md:h-50 rounded-2xl" />
                  </div>)

                  : (
                   <div className="m-2 p-2 mt-3 flex justify-center items-center w-full">
  <div className="flex flex-col items-center bg-gray-300 border-2 border-gray-300 mr-[70%] w-40 max-w-md md:max-w-lg rounded-2xl p-4">
    <b className='m-2 text-center'>
      It may take a few minutes to compress & upload the video.
    </b>
    <img src={loadinggif} alt="Loading..." className="w-10 h-10 md:w-16 md:h-16" />
  </div>
</div>


                  )

              )}
              <div>
                <div className='m-2 p-2  md:m-2 text-3xl text-gray-500 font-medium'>
                  Upload Blog-Image
                </div>
                <input
                  type="file"
                  name="blogimage"
                  id="blogimage"
                  className="m-2"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>
              {imagePreview && (
                <div className="m-2 p-2 mt-3 flex justify-center items-center w-[30%] md:w-[50%] ">
                  <img src={imagePreview} alt="Preview" className=" object-cover w-50 h-30 md:w-80 md:h-50 rounded-2xl" />
                </div>
              )}

              <div className='m-2 p-2 md:m-2 text-3xl text-gray-500 font-medium '>Heading</div>
              <div className="md:m-2 p-2 w-200">
                <input
                  type="text"
                  placeholder="Enter blog title..."
                  className="m-2 outline-none text-2xl md:w-100 p-1 text-gray-700 border-gray-300 border rounded-xl"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="m-2 p-2">
                <div className='my-4 text-3xl text-gray-500 font-medium' ref={toolbarRef}>Content</div>
                {/* <textarea
                            value={content}
                            onChange={handleContentChange}
                            
                            placeholder="Write your blog content here..."
                            className="w-200 border-1 h-"
                            /> */}
                <ReactQuill
                  value={content}
                  onChange={handleContentChange}
                  theme="snow"
                  placeholder="Write your blog content here..."
                  className="w-[38%] md:w-[70%]  text-4xl border-gray-100 border"

                />
              </div>

              <button type="submit" className="text-lg lg:text-xl cursor-pointer mx-4 p-1 w-20 bg-green-700 rounded-2xl text-white">
                {!mutation.isPending ? "Save" : "Saving..."}
              </button>
            </form>
            <button className='w-20 ml-4 mt-4 bg-black hover:bg-purple-800 text-white text-sm font-medium py-3 rounded-xl transition-all duration-300 cursor-pointer ' onClick={scrollToTollbar} >Editbar ↑</button>
          </div>
         
        </div>
      </>
      // )
    }
  </>


}

export default Edit;
