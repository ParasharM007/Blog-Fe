import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import "./Plus.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
function Plus() {
  const navigate=useNavigate()
 
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  // const userId =localStorage.getItem('userId')
  useEffect(()=>{
    const cookie = Cookies.get('accessToken')
    setIsLoggedIn(!!cookie)   //conver to boolean
  },[])


  const handleNavigate=()=>{
    // if(userId){
    //   navigate(
    //     '/create-blog'
    //   )

    // }
    if(isLoggedIn){
      navigate(
        `/create-blog`
      )
    }
    else{
      toast.error("Please login first to create a new blog")
    }
  }

  return (
    
       <button className='p-2 cursor-pointer rounded-[100%] text-white z-50 fixed md:right-[20%] md:top-[70%] right-[20%] top-[70%]  bg-yellow-700' onClick={handleNavigate}>
        <FaPlus className='text-5xl lg:text-6xl'/> 
      </button>
    
  )
}

export default Plus