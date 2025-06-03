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
      // return await axios.post(`http://localhost:5000/api/v1/users/register`,formData,
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
    if(imageFile) formData.append("avatar",imageFile)
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
  // return (
  //   <div className='register-cont'>
      
  //     <div className='m-3 mt-7 p-5 w-70 md:h-120 md:w-120 bg-gray-300 flex flex-col items-center justify-center'>

  //       <h1 className='text-black  p-2 m-2 text-[23px] md:text-4xl '>Welcome To WildEarth</h1>
  //       <form action="submit"
  //         onSubmit={handleRegisterUser}
  //         className='flex flex-col items-center'
  //       >

  //         <input type="text"
  //           required={true}
  //           placeholder='Enter full name'
  //           className='m-2 p-2 text-lg bg-white rounded-md outline-none'
  //           onChange={(e) =>{setFullName(e.target.value)}}
  //           />
  //         <input type="email"
  //           required={true}
  //           placeholder='Enter email'
  //           className='m-2 p-2 text-lg bg-white rounded-md outline-none'
  //           onChange={(e) => {setEmail(e.target.value)}}
  //           />
  //         <input type="username"
  //           required={true}
  //           placeholder='Enter username'
  //           className='m-2 p-2 text-lg bg-white rounded-md outline-none'
  //           onChange={(e)=>setUsername(e.target.value)}
  //           />

  //         <input type="text"
  //           required={true}
  //           placeholder='Enter password '
  //           className='m-2 p-2 text-lg bg-white rounded-md outline-none'
  //           onChange={(e) => {setPassword(e.target.value)}}
  //           />
  //           <div className=" m-2 w-auto">

  //           <span className=''>Profile/Avatar:-</span>
  //         <input type="file"
  //           name="avatar" 
  //           id="avatar"
  //           className='mt-2 border-1 border-gray-400 w-50 cursor-pointer'
  //           accept="image/*"
            
  //           onChange={handleImageChange}
  //           required
  //           />
  //           </div>
            
  //         <button type='submit' className='m-2 p-2 w-40 cursor-pointer bg-black text-white text-lg hover:bg-purple-800 rounded-md outline-none'>{!mutation.isPending?"Sign Up":"Signing Up..."}</button>
  //       </form>
  //     </div>
  //   </div>
  // )

  return (
  <div className="min-h-[90vh] bg-gray-100 flex items-center justify-center p-4">
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
      <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">
        Welcome to WildEarth
      </h1>

      <form onSubmit={handleRegisterUser} className="space-y-5">
        <input
          type="text"
          required
          placeholder="Enter full name"
          className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          required
          placeholder="Enter email"
          className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          required
          placeholder="Enter username"
          className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="Enter password"
          className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <label htmlFor="avatar" className="block text-sm text-gray-700 mb-1">
            Profile / Avatar
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            // required
            className="w-full p-2 bg-white rounded-xl border border-gray-300 text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black hover:bg-purple-800 text-white text-sm font-medium py-3 rounded-xl transition-all duration-300"
        >
          {!mutation.isPending ? "Sign Up" : "Signing Up..."}
        </button>
      </form>
    </div>
  </div>
);

}

export default Register