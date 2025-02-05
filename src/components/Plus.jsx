import React from 'react'
import { FaPlus } from 'react-icons/fa';
import "./Plus.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Plus() {
  const navigate=useNavigate()
  const userId =localStorage.getItem('userId')
  const handleNavigate=()=>{
    if(userId){
      navigate(
        '/create-blog'
      )

    }
    else{
      toast.error("Please login first to create a new blog")
    }
  }

  return (
    
       <button className='plus' onClick={handleNavigate}>
        <FaPlus className='icon'/> 
      </button>
    
  )
}

export default Plus