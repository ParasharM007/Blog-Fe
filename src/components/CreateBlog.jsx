import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Edit.css';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import loadinggif from "../assets/loading-gif.gif"

function Edit() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false)
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview]=useState(null);
  const [content, setContent] = useState('');
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

  const handleNavigate = () => {
    navigate('/');
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    // setCleanedContent(content)
    // const plainText = content.replace(/<[^>]+>/g, ''); // Removes all HTML tags
    const formData = new FormData();
    formData.append('title', title);
    // formData.append('content', plainText);
    formData.append('content', content);
    if (image) formData.append('blogImg', image);

    try {
      setLoading(true)
      const res = await axios.post(`${API_BASE_URL}/v1/users/create-blog`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    },
     
      
   
    );

      if (res.status === 200) {
        console.log('Blog created successfully');
        toast.success("Blog created successfully")
        setLoading(false);
        // Optionally, redirect after successful blog creation
        navigate('/');
        
      }
    } catch (error) {
      setLoading(false);
      toast.error("Couldn't create blog")
      console.log('Error while creating blog:', error);
    }
  };

  return <>
    {
      isLoading ? (
        <>
                        <div className=" flex justify-center items-center ">
                          <img src={loadinggif} alt="Loading..." className="loading-gif" style={{ color: 'white' }} />
                        </div> 
                        </>
                      ) : (
                        <>
                        
                        <div className="flex justify-center items-center">
                        <div className="m-2 p-2 md:m-5 md:p-5 flex flex-col border items-start w-full md:w-[80%] lg:w-[60%]">
                          <div className="flex justify-between items-center w-full">
                            <div className="m-2 font-light text-3xl md:text-4xl ">Create Your Blogs with MyBlog...</div>
                            <div className="p-1 cursor-pointer flex gap-2 items-center bg-purple-600 text-white rounded-xl" onClick={handleNavigate}>
                              {/* <MdArrowBack style={{ backgroundColor: 'blueviolet', fontSize: '30px' }} /> */}
                              <MdArrowBack className='text-xl lg:text-3xl' />
                              <button className="text-lg lg:text-xl cursor-pointer" >
                                Back
                              </button>
                            </div>
                          </div>
                  
                          <form onSubmit={handleSave}>
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
            <div className="m-2 p-2 mt-3 flex justify-center items-center w-50 md:w-100 lg:w-150"> 
              <img src={imagePreview} alt="Preview" className="border-3 border-gray-300 object-cover w-50 h-30 md:w-80 md:h-50 rounded-2xl" />
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
                            <div className='my-4 text-3xl text-gray-500 font-medium'>Content</div>
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
                            className="w-70 md:w-100 lg:w-148 text-4xl border-gray-300 border"
                            
                            />
                            </div>
                  
                            <button type="submit" className="text-lg lg:text-xl cursor-pointer mx-4 p-1 w-20 bg-green-700 rounded-2xl text-white">
                              Save
                            </button>
                          </form>
                        </div>
                      </div>
                      </>
                      )
                    }
                    </>
   
  
}

export default Edit;
