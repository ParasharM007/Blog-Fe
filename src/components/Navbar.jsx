import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import { FaBars, FaHeart, FaUser } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import api from '../utils/api_Interceptor';
import { AuthContext } from '../utils/AuthContext';
import loadinggif from '../assets/loading-gif.gif'
import profIcon from "../assets/images/profileIcon.png"
import { AiOutlineSearch } from 'react-icons/ai';



function Navbar() {
  const [showMenu,setShowMenu]=useState(false)
  const [showProfile,setShowProfile]=useState(false);
  // const [isLoggedIn,setIsLoggedIn]=useState(false)
  const {isLoggedIn , setIsLoggedIn , loading , avatar , setAvatar , AdminLogin ,setAdminLogin } = useContext(AuthContext)

   const [visible, setVisible] = useState(true);
    let lastScrollY = window.scrollY;
  
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down
        setVisible(false);
      } else {
        // scrolling up
        setVisible(true);
      }
      lastScrollY = window.scrollY;
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
  
  
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
  navigate(AdminLogin?`/admin/${userId}`:`/profile/${userId}`);
    

  }
 else {toast.error("Please login first")}
  //  setShowProfile(!showProfile);
  }

  const handleLogout=async()=>{
    
    try {
      const res = await 
      axios.post(`${API_BASE_URL}/v1/users/logout`,
      // axios.post(`http://localhost:5000/api/v1/users/logout`,
      // api.post(`/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      
      if (res.status === 200) {
        setShowProfile(false)
        setAvatar(null)
        // setTimeout(() => {
        //   toast.success("Logged out", { toastId: "logoutSuccess" });
        //   }, 100);
        toast.success("Logged Out")
          console.log("Logout completed successfully");
          setShowMenu(false);
          setIsLoggedIn(false) 
          setAdminLogin(false)
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
    }, 2000);
  
  }
  

  return (
    
   <div className=''>
   {/* <nav className='z-50'> */}
   <nav className={`fixed left-0 right-0 h-18 bg-white transition-all duration-600 z-[999] ${
        visible ? "top-0" : "-top-100"
      }`}>
      <div className='flex m-1 p-1 justify-between items-center'>
      

    <div className='bg-black p-2 text-white text-4xl' onClick={()=>{  setShowMenu(false)
       setShowProfile(false)
    }} >
    <Link to='/'>WildEarth</Link>
      
      </div>
     
       <div className={`mr-5 text-4xl md:hidden cursor-pointer transition-transform ease-in-out duration-300 `} >
         {/* <FaBars size={30} color="white"/> */}
         {loading ? ( 
      <ul className='text-lg md:hidden flex gap-5'>
       <img src={loadinggif} alt="Loading..." className="w-10 h-10" />
      </ul>):
      isLoggedIn?(

        <div className={`${showMenu ? "-rotate-90" : "rotate-0"} transition-transform duration-600`} onClick={()=>setShowMenu(prev=>!prev)}>
    {showMenu ? <FaTimes /> : (

      // <FaBars />
      avatar?(
        
        
        <Link>
          <img src={avatar} alt='pfp' className={`border-1 shadow-xl rounded-full border-gray-400 bg-white text-black w-11 h-11 ${showProfile ? "-rotate-40" : "rotate-0"} transition-transform duration-500} `} />
        </Link>
      
    ):(
      
      <Link>
          {/* <FaUser className={`border-2 p-1 rounded-full border-gray-400 bg-white text-black text-4xl ${showProfile ? "-rotate-40" : "rotate-0"} transition-transform duration-500} `} /> */}
          <img src={profIcon} alt='pfp' className={`border-1 shadow-xl rounded-full border-gray-400 bg-white text-black w-11 h-11 ${showProfile ? "-rotate-40" : "rotate-0"} transition-transform duration-500} `} />
        </Link>
      
    ) 
  )
  
}
  </div>
):(
  <div className={`${showMenu ? "-rotate-90" : "rotate-0"} transition-transform duration-500`} onClick={()=>setShowMenu(prev=>!prev)}>
    {showMenu ? <FaTimes /> : <FaBars />}
      </div>
)
}
       </div>
      
     {/* Menu Options For Desktop */}
    <ul className='text-lg px-4 mr-4 hidden md:flex gap-5'>
  {loading ? (
    <li>
      <img src={loadinggif} alt="Loading..." className="w-10 h-10" />
    </li>
  ) : !isLoggedIn ? (
    <>
      <li className='text-2xl'>
        <Link to='/login'>Login</Link>
      </li>
      <li className='text-2xl'>
        <Link to='/register'>Register</Link>
      </li>
      <li className='text-2xl'>
        <Link to='/admin-login'>AdminLogin</Link>
      </li>
      <li 
      className="cursor-pointer flex items-center gap-2 text-pink-700 text-3xl  hover:text-white hover:bg-pink-800 transition-all duration-300 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm"
  onClick={()=>navigate('/search-blogs')}
  title="Search">
        
  

  <AiOutlineSearch className="w-4 h-4" /> {/* or FiSearch / BiSearch */}
  <span className="text-lg font-medium">Search</span>

      </li>
      <li
        // className='mt-1 text-pink-700 text-3xl cursor-pointer'
        className='cursor-pointer flex items-center gap-2 text-pink-700 text-3xl  hover:text-white hover:bg-pink-800 transition-all duration-300 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm'
        onClick={() => navigate(`/liked-blogs`)}
      >
        <FaHeart className='w-4 h-4' />
        <span className="text-lg font-medium">Liked</span>
      </li>
    </>
  ) : (
    <>
    <li 
      className="cursor-pointer flex items-center gap-2 text-pink-700 text-3xl  hover:text-white hover:bg-pink-800 transition-all duration-300 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm"
  onClick={()=>navigate('/search-blogs')}
  title="Search">
        
  

  <AiOutlineSearch className="w-4 h-4" /> {/* or FiSearch / BiSearch */}
  <span className="text-lg font-medium">Search</span>

      </li>
      <li
        // className='mt-1 text-pink-700 text-3xl cursor-pointer'
        className='cursor-pointer flex items-center gap-2 text-pink-700 text-3xl  hover:text-white hover:bg-pink-800 transition-all duration-300 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm'
        onClick={() => navigate(`/liked-blogs`)}
      >
        <FaHeart className='w-4 h-4' />
        <span className="text-lg font-medium">Liked</span>
      </li>
     {avatar?(

       <li onClick={handleShowProfile}>
        <Link>
          <img src={avatar} alt='pfp' className={`border-1 shadow-xl rounded-full border-gray-400 bg-white text-black w-11 h-11 ${showProfile ? "-rotate-40" : "rotate-0"} transition-transform duration-500} `} />
        </Link>
      </li>
      ):(
        <li onClick={handleShowProfile}>
        <Link>
          {/* <FaUser className={`border-2 p-1 rounded-full border-gray-400 bg-white text-black text-4xl ${showProfile ? "-rotate-40" : "rotate-0"} transition-transform duration-500} `} /> */}
          <img src={profIcon} alt='pfp' className={`border-1 shadow-xl rounded-full border-gray-400 bg-white text-black w-11 h-11 ${showProfile ? "-rotate-40" : "rotate-0"} transition-transform duration-500} `} />
        </Link>
      </li>
      ) 
      }
    </>
  )}
</ul>

{showProfile && 
  <div className='m-1 p-5 gap-2 grid menu-options rounded-xl text-xl border border-gray-200 max-h-[90vh] overflow-y-auto bg-white shadow-lg z-50'>

        
        <div className='border-b-2 border-purple-500 cursor-pointer' onClick={handleNavigate}>{AdminLogin?"Dashboard":"Profile"}</div>
        
        {AdminLogin && <>
        <div className='border-b-2 border-purple-500 cursor-pointer' onClick={()=>{
                                                                      navigate("/cover-video")
                                                                      setShowMenu(false)
                                                                      setShowProfile(false)
                                                                      }}>Cover Video

        </div>
         <div className='border-b-2 border-purple-500 cursor-pointer' onClick={()=>{
                                                                      navigate("/change-password")
                                                                      setShowMenu(false)
                                                                      setShowProfile(false)
                                                                      }}>Change Password

        </div></>}
        <div className='border-b-2 border-purple-500 cursor-pointer' onClick={handleLogout}>Logout

        </div>
       
       
       
        </div>
        }    









     {/* Menu Options For Mobile */}
     
     <ul className={`md:hidden p-3 border border-gray-300 rounded-xl absolute z-30 flex flex-col top-20 right-5 text-gray-900 bg-white gap-3 max-h-[90vh] overflow-y-auto transition-all duration-300 transform ease-in-out ${showMenu ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"}`}>

      {!isLoggedIn ?
      
     ( <>
     <li className='border-b-2 border-purple-500 text-xl'>
      <Link to='/login' onClick={()=>setShowMenu(false)}>Login</Link>
      
      </li>
      
      
      <li className='border-b-2 border-purple-500 text-xl'>
      <Link to='/register' onClick={()=>setShowMenu(false)}>Register</Link>
        
        </li>
      <li className='border-b-2 border-purple-500 text-xl'>
      <Link to='/admin-login' onClick={()=>setShowMenu(false)}>AdminLogin</Link>
        
        </li>
         <li className='border-b-2 border-pink-700 text-pink-700 text-xl' 
           onClick={(e)=>
          {
            navigate(`/search-blogs`)
            setShowMenu(false)
            }}
          >
          {/* <FaHeart /> */}
          Search
        </li>
         <li className='border-b-2 border-pink-700 text-pink-700 text-xl' 
           onClick={(e)=>
          {
            navigate(`/liked-blogs`)
            setShowMenu(false)
            }}
          >
          {/* <FaHeart /> */}
          Liked
        </li>
      
     </>
        ):(

         <>
         <li className='flex flex-col gap-2 text-xl'>
      <button className='border-b-2 border-purple-500' onClick={handleNavigate} >{AdminLogin?"Dashboard":"Profile"} </button>
      {AdminLogin && <><div className='border-b-2 border-purple-500 cursor-pointer' onClick={()=>{
                                                                      navigate("/cover-video")
                                                                      setShowMenu(false)
                                                                      setShowProfile(false)
                                                                      }}>Cover Video

      </div>
      <div className='border-b-2 border-purple-500 cursor-pointer' onClick={()=>{
                                                                      navigate("/change-password")
                                                                      setShowMenu(false)
                                                                      setShowProfile(false)
                                                                      }}>Change Password

        </div>
        </>}
      <Link className='border-b-2 border-purple-500' onClick={handleLogout} >Logout </Link>
        
       <li className='border-b-2 border-pink-700 text-pink-700' onClick={(e)=>
          {
            navigate(`/search-blogs`)
            setShowMenu(false)
            }}>
          {/* <FaHeart /> */}
          Search
        </li>
       <li className='border-b-2 border-pink-700 text-pink-700' onClick={(e)=>
          {
            navigate(`/liked-blogs`)
            setShowMenu(false)
            }}>
          {/* <FaHeart /> */}
          Liked
        </li>
        </li>
        
         </> 
      )
      } 
       
     </ul>
      
     
     
      </div>
    <div className=''>
      <hr className='text-gray-800'/>
      </div>
    </nav>
     
  </div>
  )
}

export default Navbar