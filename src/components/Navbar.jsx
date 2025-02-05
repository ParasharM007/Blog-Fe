import React, { useState } from 'react'
import "./Navbar.css"
import { FaBars, FaUser } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';


function Navbar() {
  const [showMenu,setShowMenu]=useState(false)
  const [showProfile,setShowProfile]=useState(false);
  const navigate=useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId=localStorage.getItem('userId');
  const toggleMenu=()=>{
    setShowMenu(!showMenu);
    
  }
  const handleShowProfile=()=>{
    setShowProfile(!showProfile);

  }
  const handleNavigate=()=>{
  const id=localStorage.getItem('userId');
  if(id) {
    navigate(`/profile/${id}`)

  }
 else {toast.error("Please login first")}
   setShowProfile(!showProfile);
  }

  const handleLogout=async()=>{
    
    try {
      const res = await axios.post(
        `${API_BASE_URL}/v1/users/logout`,
        {},
        { withCredentials: true }
      );
  
      if (res.status === 200) {
        setTimeout(() => {
          toast.success("Logged out", { toastId: "logoutSuccess" });
          }, 100);
          console.log("Logout completed successfully");
          if(userId){
            
            localStorage.removeItem("userId")
          }
        
      }
      setShowProfile(false);
    } catch (error) {
      toast.error("Couldn't log out"
        // , { toastId: "logoutError" }
      );
      console.log("Error while logging out " + error);
    }
  
    setTimeout(() => {
      navigate("/");
    }, 8000);
  
  }
  return (
    <div>
    <nav className='nav'>
      <div className='nav-items'>

    <div className='logo'>
    <Link to='/'>MyBlog</Link>
      
      </div>
     
       <div className='hampburger' onClick={toggleMenu}>
         {/* <FaBars size={30} color="white"/> */}
         {showMenu ? <FaTimes size={30} color="white" /> : <FaBars size={30} color="white" />}

       </div>
     
     <ul className={`nav-list ${showMenu?'open':''}`}>
      {!userId?
      
     ( <>
     <li>
      <Link to='/login'>Login</Link>
      
      </li>
      
      
      <li>
      <Link to='/register'>Register</Link>
        
        </li>
     </>
        ):(

          <li onClick={handleShowProfile}>
      <Link className='menu' > <FaUser /> </Link>
        
        </li>
      )
      } 
       
     </ul>
     {/* <ToastContainer theme='dark'/> */}
     {showProfile && 
        <div className='menu-options'><div onClick={handleNavigate}>Profile</div>
        <div onClick={handleLogout}>Logout

        </div>
        </div>
        }    
      </div>
    <div className='line'>
      <hr style={{border:'1px solid white',color:'white'}}/>
      </div>
    </nav>
     
  </div>
  )
}

export default Navbar