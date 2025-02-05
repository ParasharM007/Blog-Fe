import React, { useEffect, useState } from 'react'
import "./Myposts.css"
import MyPost from './MyPost'
import Plus from './Plus.jsx'

function Myposts() {
 
  return (
    <div className='myposts-cont'>
   
     <MyPost />
     <Plus />
    </div>
  )
}

export default Myposts