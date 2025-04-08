import React, { useEffect, useState } from 'react'
import "./Profile.css"
import loadinggif from "../assets/loading-gif.gif"
import Myposts from './Myposts'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Profile() {
  const [profileData,setProfileData] =useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [date,setDate]=useState(null)
  
  const { id }=useParams()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  if(!id){
    console.log("Id is not available")
  }
  
  
useEffect(() => {
  const fetchProfile=async() => {
    try {
      setisLoading(true)
      const res= await axios.post(`${API_BASE_URL}/v1/users/profile`,
        {
          "id":id
        },
        {withCredentials:true}
      )
      setProfileData(res.data?.data)
      const createdAt = res.data.data?.createdAt;
      const date = new Date(createdAt);
      
      // Format to display only the date (YYYY-MM-DD)
      setDate(date.toLocaleDateString());
      
      setisLoading(false)
    } catch (error) {
      setisLoading(false)
      console.log("Error fetching profile: "+error)
    }
  }
  fetchProfile();

},[id])
  return (
    <>
    {isLoading?(
       <> <div className="loading-container">
                          <img src={loadinggif} alt="Loading..." className="loading-gif" style={{ color: 'white' }} />
                        </div> </>
    ):(

      
      <div className='flex items-center justify-center  m-2 p-2 gap-4 md:gap-12'>
        <div className="mt-15 ">
          <div >
            <img src={profileData?.avatar} alt="pfp" className="rounded-[100%] w-40 h-40 md:w-50 md:h-50"/>
          </div>
          <div className="m-3 p-1 md:text-5xl text-4xl font-light">{profileData?.username || "username"}</div>
        </div>
        <div className="">
          <div className="flex flex-col gap-2  text-md md:text-xl ">
            <div>{profileData?.fullName || "Full Name"}</div>
            <div>{profileData?.email || "user-email"}</div>
            <div>Joined at:-{date|| "data of joining"}</div>
              
          </div>
        </div>
    </div>
  )
    }
    
    <div className="m-5 p-5 mt-3 md:mt-10  flex flex-col justify-center items-center ">
      <div className="font-light text-4xl md:text-5xl">My Posts</div>
      <div className="">
     <Myposts />

      </div>
    </div>
    </>
  )
}

export default Profile