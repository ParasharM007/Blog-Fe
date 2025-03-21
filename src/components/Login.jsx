import React, { useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


function Login() {
  const [Email , setEmail]=useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
   const handleLogin=async(e) => {
    e.preventDefault(); // Prevent page reload on form submit
    
    try {
      const res = await axios.post(`${API_BASE_URL}/v1/users/login`, 
      // formData, {
        // headers: { 'Content-Type': 'multipart/form-data' },
      // }
      {
        "email":Email ,
        "password":password
      },
    {
      withCredentials: true,
    }
    );

      if (res.status === 200) {
        console.log("Calling toast success");
        toast.success("Login Successful")
        const id=res.data.data.user._id
        console.log(
          id
        )
        if(id) localStorage.setItem('userId',id);
        console.log('User Logged in successfully!!');
        setTimeout(() => {
          navigate(`/profile/${id}`);
        }, 2000); 
      
      }
    } catch (error) {
      toast.error("Error while logging in")
      console.log('Error while logging in: ', error);
    }
  };
        
   
  
  return (<>
    <ToastContainer theme='dark'/>
    <div className='login-cont'>
      <div className='m-3 mt-7 p-5  md:h-120 md:w-120 bg-gray-300 flex flex-col items-center justify-center'>

        <h1 className='text-black  p-2 m-2 text-[23px] md:text-4xl '>MyBlog Login</h1>
        <form action="submit"
             onSubmit={handleLogin}
             className='flex flex-col items-center'
             >

          <input type="text" 
                 required={true}
                 placeholder='Enter username or email'   
                 className='m-2 p-2 text-lg bg-white rounded-md outline-none' 
                 onChange={(e)=>setEmail(e.target.value)}      
          />
          
          <input type="text" 
                 required={true}
                 placeholder='Enter password '          
                 className='m-2 p-2 text-lg bg-white rounded-md outline-none'
                 onChange={(e)=>setPassword(e.target.value)}
          />
          <button type="submit" className='m-2 p-2 w-40 cursor-pointer bg-black text-white text-lg hover:bg-purple-800   rounded-md outline-none'>Login</button>
        </form>
                 </div>
    </div>
                 </>
  )
}

export default Login