import React, { useEffect, useState } from 'react'
import "./Myposts.css"
import MyPost from './MyPost'


function Myposts() {
 
  return (
    <div className='m-2.5 p-2.5 flex flex-col items-center'>
   
     <MyPost />
     {/* <Plus /> */}
    </div>
  )
}

export default Myposts