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
      <div className='log-cont'>

        <h1 className='login-head'>MyBlog</h1>
        <form action="submit"
             onSubmit={handleLogin}
             className='login-form'
             >

          <input type="text" 
                 required={true}
                 placeholder='Enter username or email'   
                 className='email' 
                 onChange={(e)=>setEmail(e.target.value)}      
          />
          
          <input type="text" 
                 required={true}
                 placeholder='Enter password '          
                 className='passw'
                 onChange={(e)=>setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
                 </div>
    </div>
                 </>
  )
}

export default Login