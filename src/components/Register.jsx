import React, { useState } from 'react'
import "./Register.css"
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
function Register() {
  const [username,setUsername]=useState(null)
  const [fullName,setFullName]=useState(null)
  const [password,setPassword]=useState(null)
  const [email,setEmail]=useState(null)
  const [imageFile,setImageFile]=useState(null)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleImageChange=(e)=>{
    setImageFile(e.target.files[0])
  }
  const handleRegisterUser =async (e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append("username",username)
    formData.append("fullName",fullName)
    formData.append("password",password)
    formData.append("email",email)
    formData.append("avatar",imageFile)
    console.log(formData)
    try {
      const res= await axios.post(`${API_BASE_URL}/v1/users/register`,formData,
        { 
          headers:{
            "Content-Type" : "multipart/form-data"
          }
        }
        
      )
      toast.success("Account created successfully")
      console.log("User registration successful "+res)
    } catch (error) {
      toast.error("Error in creating account");
      console.log("Error while registering user: " + error)
    }
  }
  return (
    <div className='register-cont'>
      <ToastContainer theme='dark'/>
      <div className='reg-cont'>

        <h1 className='register-head'>Welcome To MyBlog</h1>
        <form action="submit"
          onSubmit={handleRegisterUser}
          className='register-form'
        >

          <input type="text"
            required={true}
            placeholder='Enter full name'
            className='reg-email'
            onChange={(e) =>{setFullName(e.target.value)}}
            />
          <input type="email"
            required={true}
            placeholder='Enter email'
            className='reg-email'
            onChange={(e) => {setEmail(e.target.value)}}
            />
          <input type="username"
            required={true}
            placeholder='Enter username'
            className='reg-email'
            onChange={(e)=>setUsername(e.target.value)}
            />

          <input type="text"
            required={true}
            placeholder='Enter password '
            className='reg-passw'
            onChange={(e) => {setPassword(e.target.value)}}
            />
            <div className="avatar-cont">

            <span className='profile'>Profile/avatar:-</span>
          <input type="file"
            name="avatar" 
            id="avatar"
            className='avatar'
            accept="image/*"
            
            onChange={handleImageChange}
            required
            />
            </div>
            
          <button type='submit' className='reg-button'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register