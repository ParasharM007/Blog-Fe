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

},[])
  return (
    <>
    {isLoading?(
       <> <div className="loading-container">
                          <img src={loadinggif} alt="Loading..." className="loading-gif" style={{ color: 'white' }} />
                        </div> </>
    ):(

      
      <div className='profile-cont'>
        <div className="left">
          <div >
            <img src={profileData?.avatar} alt="pfp" className="pfp"/>
          </div>
          <div className="username">{profileData?.username || "username"}</div>
        </div>
        <div className="right">
          <div className="details">
            <div>{profileData?.fullName || "Full Name"}</div>
            <div>{profileData?.email || "user-email"}</div>
            <div>{date|| "data of joining"}</div>
              
          </div>
        </div>
    </div>
  )
    }
    
    <div className="posts-cont">
      <div className="posts-head">My Posts</div>
      <div className="posts">
     <Myposts />

      </div>
    </div>
    </>
  )
}

export default Profile