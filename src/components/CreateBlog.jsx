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
  const [content, setContent] = useState('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis voluptatem natus quibusdam similique, sit ipsa architecto dicta facere fuga animi sunt dolorem asperiores nobis atque consectetur modi cum velit, repudiandae, aliquid iure repellendus cumque? Magni et aut hic perspiciatis molestias unde optio iste voluptatibus doloremque, porro enim dicta quisquam eum fugit deleniti ipsam eius tempore fugiat. Quisquam nisi dicta assumenda hic necessitatibus sit magnam sequi rerum officiis?');
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
    const plainText = content.replace(/<[^>]+>/g, ''); // Removes all HTML tags
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', plainText);
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
                        <div className="loading-container">
                          <img src={loadinggif} alt="Loading..." className="loading-gif" style={{ color: 'white' }} />
                        </div> 
                        </>
                      ) : (
                        <>
                        <div className="edit-container">
                        <div className="edit-cont">
                          <div className="edit-headng">
                            <div className="edit-head">Create Your Blogs with MyBlog...</div>
                            <div className="back">
                              <MdArrowBack style={{ backgroundColor: 'blueviolet', fontSize: '30px' }} />
                              <button className="back-btn" onClick={handleNavigate}>
                                Back
                              </button>
                            </div>
                          </div>
                  
                          <form onSubmit={handleSave}>
                            <div>
                              <div style={{ fontSize: '30px', margin: '5px', padding: '5px' }}>
                                Upload Blog-Image
                              </div>
                              <input
                              type="file"
                              name="blogimage"
                              id="blogimage"
                              className="blogimage"
                              accept="image/*"
                              onChange={handleImageChange}
                                required
                              />
                            </div>
                            {imagePreview && (
            <div className="image-preview-container">
              <img src={imagePreview} alt="Preview" className="image-preview" />
            </div>
          )}
                  
                            <div style={{ fontSize: '30px', margin: '5px', padding: '5px' }}>Heading</div>
                            <div className="blog-heading">
                              <input
                                type="text"
                                placeholder="Enter blog title..."
                                className="blog-title-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                              />
                            </div>
                  
                            <div className="blog-description">
                            <div style={{ fontSize: '30px', margin: '5px', padding: '5px' }}>Content</div>
                            <ReactQuill
                            value={content}
                            onChange={handleContentChange}
                            theme="snow"
                            placeholder="Write your blog content here..."
                            className="quill-edit"
                            />
                            </div>
                  
                            <button type="submit" className="save-btn">
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
