import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import "./Plus.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';

function Plus() {
  const navigate=useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
 
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  // const userId =localStorage.getItem('userId')
  // useEffect(()=>{
  //   const cookie = Cookies.get('accessToken')
                                                                  //WE CAN ACCESS COOKIES ONLY IF THEY ARE HTTPSONLY:FALSE;
  //   if(cookie) console.log(cookie)
  //   setIsLoggedIn(!!cookie)   //conver to boolean
  // },[])


  const handleNavigate=async ()=>{
    try {
      const res = await axios.get(`${API_BASE_URL}/v1/users/nav-items`,
      // const res = await axios.get(`http://localhost:5000/api/v1/users/nav-items`,
       {withCredentials: true}
      )
      console.log(res.data.data.data)
      setIsLoggedIn(res.data.data.data)
     if(isLoggedIn){

       navigate(
         `/create-blog`
        )
      }
      
      
    } catch (error) {
      toast.error("Please login first to create a new blog") 
      setIsLoggedIn(false) 
    }

     





    
  }

  return (
    
       <button className='p-2 cursor-pointer rounded-[100%] text-white z-50 fixed md:right-[20%] md:top-[70%] right-[20%] top-[70%]  bg-yellow-700' onClick={()=>handleNavigate()}>
        <FaPlus className='text-5xl lg:text-6xl'/> 
      </button>
    
  )
}

export default Plus