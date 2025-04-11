import React, { useState } from 'react'
import "./Register.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
function Register() {
  const [username,setUsername]=useState(null)
  const [fullName,setFullName]=useState(null)
  const [password,setPassword]=useState(null)
  const [email,setEmail]=useState(null)
  const [imageFile,setImageFile]=useState(null)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate=useNavigate();
  const handleImageChange=(e)=>{
    setImageFile(e.target.files[0])
  }
  const mutation = useMutation({

    mutationFn: async ({formData})=>{
      return await axios.post(`${API_BASE_URL}/v1/users/register`,formData,
        { 
          headers:{
            "Content-Type" : "multipart/form-data"
          }
        }
        
      )
    }
    })
  const handleRegisterUser =async (e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append("username",username)
    formData.append("fullName",fullName)
    formData.append("password",password)
    formData.append("email",email)
    formData.append("avatar",imageFile)
    console.log(formData)
    mutation.mutate({formData},
      {onSuccess:(res)=>{
        toast.success("Account created successfully")
        console.log("User registration successful "+res)
        setTimeout(() => {
          navigate('/login')
          
        }, 3000);
      },
      onError:(err)=>{
        toast.error("Error in creating account");
        console.log("Error while registering user: " + err)
      }
    }
    )
  }
  return (
    <div className='register-cont'>
      
      <div className='m-3 mt-7 p-5 w-70 md:h-120 md:w-120 bg-gray-300 flex flex-col items-center justify-center'>

        <h1 className='text-black  p-2 m-2 text-[23px] md:text-4xl '>Welcome To MyBlog</h1>
        <form action="submit"
          onSubmit={handleRegisterUser}
          className='flex flex-col items-center'
        >

          <input type="text"
            required={true}
            placeholder='Enter full name'
            className='m-2 p-2 text-lg bg-white rounded-md outline-none'
            onChange={(e) =>{setFullName(e.target.value)}}
            />
          <input type="email"
            required={true}
            placeholder='Enter email'
            className='m-2 p-2 text-lg bg-white rounded-md outline-none'
            onChange={(e) => {setEmail(e.target.value)}}
            />
          <input type="username"
            required={true}
            placeholder='Enter username'
            className='m-2 p-2 text-lg bg-white rounded-md outline-none'
            onChange={(e)=>setUsername(e.target.value)}
            />

          <input type="text"
            required={true}
            placeholder='Enter password '
            className='m-2 p-2 text-lg bg-white rounded-md outline-none'
            onChange={(e) => {setPassword(e.target.value)}}
            />
            <div className=" m-2 w-auto">

            <span className=''>Profile/avatar:-</span>
          <input type="file"
            name="avatar" 
            id="avatar"
            className='mt-2 border-1 border-gray-400 w-50 cursor-pointer'
            accept="image/*"
            
            onChange={handleImageChange}
            required
            />
            </div>
            
          <button type='submit' className='m-2 p-2 w-40 cursor-pointer bg-black text-white text-lg hover:bg-purple-800 rounded-md outline-none'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register