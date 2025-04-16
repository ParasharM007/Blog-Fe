import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import { FaBars, FaUser } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
// import { UserContext } from '../UserContext.jsx';


function Navbar() {
  const [showMenu,setShowMenu]=useState(false)
  const [showProfile,setShowProfile]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  // const {isLoggedIn , setLoggedIn} = useContext(UserContext)
  const navigate=useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId=localStorage.getItem('userId');
 
  // const toggleMenu=()=>{
  //   setShowMenu(!showMenu);
    
  // }
  const handleShowProfile=()=>{
    setShowProfile(prev=>!prev);
    

  }
  const handleNavigate=()=>{
  setShowMenu(false)
  setShowProfile(false)
  if(userId) {
    navigate(`/profile/${userId}`)
    

  }
 else {toast.error("Please login first")}
  //  setShowProfile(!showProfile);
  }

  const handleLogout=async()=>{
    
    try {
      const res = await axios.post(
        `${API_BASE_URL}/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      
      if (res.status === 200) {
        setShowProfile(false)
        setTimeout(() => {
          toast.success("Logged out", { toastId: "logoutSuccess" });
          }, 100);
          console.log("Logout completed successfully");
          setShowMenu(false);
          setIsLoggedIn(false) 
          // setLoggedIn(false)
          if(userId){
            
            localStorage.removeItem("userId")
          }
        
      }
      
    } catch (error) {
      toast.error("Couldn't log out"
        // , { toastId: "logoutError" }
      );
      console.log("Error while logging out " + error);
      setShowMenu(false);
    }
    
    setTimeout(() => {
      navigate("/");
    }, 5000);
  
  }
  useEffect(()=>{
   (
  async()=>{

    try {
     const res = await axios.get(`${API_BASE_URL}/v1/users/nav-items`,
      {withCredentials: true}
     )
     console.log(res.data.data.data)
     setIsLoggedIn(res.data.data.data)
     
     
   } catch (error) {
     console.log("Error in fetching nav items")  
     setIsLoggedIn(false) 
   }
  }
   )()
  },[userId])
  return (
    <div className=''>
    <nav className='z-10'>
      <div className='flex m-1 p-1 justify-between items-center'>

    <div className='bg-black p-2 text-white text-4xl' onClick={()=>{  setShowMenu(false)
       setShowProfile(false)
    }} >
    <Link to='/'>MyBlog</Link>
      
      </div>
     
       <div className={`mr-5 text-4xl md:hidden cursor-pointer transition-transform ease-in-out duration-300 `} onClick={()=>setShowMenu(prev=>!prev)}>
         {/* <FaBars size={30} color="white"/> */}
         <div className={`${showMenu ? "-rotate-90" : "rotate-0"} transition-transform duration-600`}>
    {showMenu ? <FaTimes /> : <FaBars />}
  </div>

       </div>
      
     {/* Menu Options For Desktop */}
     <ul className='text-lg px-4 mr-4 hidden md:flex gap-5'>
      {!isLoggedIn?
      
      
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
      <Link  > <FaUser className='border-2 p-1 rounded-[100%] border-gray-400 bg-white text-black text-4xl'/> </Link>
        
        </li>
      )
      } 
       
     </ul>
     {/* Menu Options For Mobile */}
     <ul className={`md:hidden p-2 border-1 border-gray-300 absolute z-30 flex flex-col top-19 right-10 text-gray-900 bg-gray-200 gap-3  transition-all duration-300 transform ease-in-out ${showMenu ? " translate-x-0 opacity-100 visible" : " translate-x-full opacity-0 invisible"}`}>
      {!isLoggedIn?
      
     ( <>
     <li className='border-b-2 border-gray-400'>
      <Link to='/login' onClick={()=>setShowMenu(false)}>Login</Link>
      
      </li>
      
      
      <li className='border-b-2 border-gray-400'>
      <Link to='/register' onClick={()=>setShowMenu(false)}>Register</Link>
        
        </li>
      
     </>
        ):(

         <>
         <li className='flex flex-col gap-2 text-xl'>
      <button className='border-b-2 border-gray-400' onClick={handleNavigate} >Profile </button>
      <Link className='border-b-2 border-gray-400' onClick={handleLogout} >Logout </Link>
        
        </li>
        
         </> 
      )
      } 
       
     </ul>
     
     {showProfile && 
        <div className='menu-options'>
        <div onClick={handleNavigate}>Profile</div>
        <div onClick={handleLogout}>Logout

        </div>
       
       
        </div>
        }    
      </div>
    <div className=''>
      <hr className='text-gray-800'/>
      </div>
    </nav>
     
  </div>
  )
}

export default Navbar