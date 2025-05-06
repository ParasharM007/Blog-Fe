import React, { useEffect, useRef, useState } from 'react'
import "./Profile.css"
import loadinggif from "../assets/loading-gif.gif"
import Myposts from './Myposts'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchProfile=async(id) => {
 
    const res= await axios.post(`${API_BASE_URL}/v1/users/profile`,
      {
        "id":id
      },
      {withCredentials:true}
    )
   return res.data?.data
}



function Profile() {
  const [date,setDate]=useState(null)
  const [editProfile, setEditProfile] = useState(false)
  const [imagePreview, setImagePreview] = useState("");
    const [image, setImage] = useState(null);
    const [fullName, setFullName] = useState('')
    const fileInputRef = useRef(null)
    
    const handleIconClick = () => {
      fileInputRef.current.click();
    };
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setImage(file)
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result); 
        };
        reader.onerror = () => {
          console.error('Error reading file:', reader.error);
          alert('Failed to read the file. Please try again with a valid image.');
        };
        reader.readAsDataURL(file);
      }
    };

    const mutation = useMutation({
      mutationFn: async({formData})=>{
        const res = await axios.post(`${API_BASE_URL}/v1/users/update-profile-data`,
        
          formData,
          {
            withCredentials:true,
            headers:{
              "Content-Type":"multipart/form-data"
            }

          }
          )
        
        
          return res.data;
      }

      

    })

  const submitProfile=async(e)=>{
    e.preventDefault();
    // setEditProfile(false)
    if(!imagePreview){
     return  toast.error("Please provide avatar")
    }
    if(!image){
      return  toast.error("Please provide avatar")

    }
    const formData = new FormData();
    formData.append("fullName",fullName)
    formData.append("avatar", image)

    mutation.mutate({formData},
      {
        onSuccess:()=>{
          toast.success('Profile updated successfully')
          window.location.reload();
        },
        onError:()=>{
          toast.error('Failed to update profile')
          console.log("Failed to update profile")
        }
      }
    )


  }

  const { id }=useParams()
  if(!id){
    console.log("Id is not available")
  }
  const {data:profileData , isLoading , isError } = useQuery(
    {queryKey: ["Profile", id] ,
      queryFn:({queryKey})=>fetchProfile(queryKey[1]),
      staleTime:20000
    }
  )
  
useEffect(()=>{
  setImagePreview(profileData?.avatar)
  setFullName(profileData?.fullName)
},[profileData])
useEffect(() => {
 
  if(profileData?.createdAt){

    const createdAt = profileData?.createdAt;
    const tempDate = new Date(createdAt);
    
    
    setDate(tempDate.toLocaleDateString());
  }

},[profileData])

  return (
    <>
    {isLoading?(
       <> <div className="loading-container">
                          <img src={loadinggif} alt="Loading..." className="loading-gif" style={{ color: 'white' }} />
                        </div> </>
    ):(

        <>
      {
!editProfile?
        
        ( <div className='flex items-center justify-center  m-2 p-2 gap-4 md:gap-12'>
        <div className="mt-15">
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
          <button className='bg-gray-700 text-white font-medium text-sm w-22 h-8 md:w-25 md:h-10 md:text-md mt-5 rounded-2xl cursor-pointer ' onClick={()=>(setEditProfile(true))}>Edit Profile</button>
        </div>
    </div>)
    
    :

   
    (<form onSubmit={submitProfile}>

    <div className='flex items-center justify-center  m-2 p-2 gap-4 md:gap-12'>
        <div className="mt-15 relative">
          {/* <div >
            <img src={profileData?.avatar} alt="pfp" className="rounded-[100%] w-40 h-40 md:w-50 md:h-50"/>
            </div> */}
            {!mutation.isPending?<img src={imagePreview} alt="pfp" className="rounded-[100%] w-40 h-40 md:w-50 md:h-50"/>:<img src={imagePreview} alt="pfp" className="rounded-[100%] w-40 h-40 md:w-50 md:h-50 opacity-50 "/>}
          <input type="file"
            name="avatar" 
            id="avatar"
            className='m-2 hidden'
            accept="image/*"
            onChange={handleImageChange}
            // required
             ref={fileInputRef}
        
            
            />
          {!mutation.isPending?(<span className=' text-3xl absolute right-1 bottom-5 cursor-pointer'  onClick={handleIconClick}>
          <FaEdit />
          </span>):(<span className=' text-3xl relative bottom-14 left-40 cursor-pointer opacity-50'  onClick={handleIconClick}>
          <FaEdit />
          </span>)}
        </div>
           <div className="">
       {
         mutation.isPending?
        (
         <div className="flex flex-col gap-2  text-md md:text-xl ">
            {/* <div>{profileData?.fullName || "Full Name"}</div> */}
            <input type="text" className='w-full bg-gray-200 opacity-50 rounded-xl p-1' value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
           
              
          </div>
        ):(

         <div className="flex flex-col gap-2  text-md md:text-xl ">
            {/* <div>{profileData?.fullName || "Full Name"}</div> */}
            <input type="text" className='w-full bg-gray-200  rounded-xl p-1' value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
           
              
          </div>
        )
        }
        <div className='flex gap-1'>

          <button className='bg-green-700 text-white font-medium text-sm w-20 h-8 md:w-25 md:h-10 md:text-md mt-5 rounded-2xl cursor-pointer' type='submit'>{mutation.isPending?"Updating..":"Save"}</button>
          {! mutation.isPending && <button type='button' className='bg-red-700 text-white font-medium text-sm w-20 h-8 md:w-25 md:h-10 md:text-md mt-5 rounded-2xl cursor-pointer' onClick={()=>setEditProfile(false)} >Cancel</button>}
        </div>
        </div>
       

          
          
         
        
        
          
    </div>
            </form>  
    )
      }
        </>
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