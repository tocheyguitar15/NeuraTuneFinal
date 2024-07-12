import React from 'react'
import home from "../assets/assets/home.png"
import classifier from "../assets/assets/music.png"
import icon from "../assets/assets/music-file.png"
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className='w-[20%] h-full p-2 pt-0 pr-1 flex-col gap-2 text-white lg:flex bg-violet-950'>
      <div className='bg-black h-[100%] rounded flex flex-col justify-items-start'>
        <div className='flex h-[10%] items-center gap-3 pl-8 cursor-pointer mx-3 mt-3 hover:bg-gray-600 rounded ' onClick={()=>{navigate("/home",{replace:true})}}>
            <img className='w-7' src={home} alt="" />
            <button className='font-bold' >Home</button>
        </div>
        <div className='flex h-[10%] items-center gap-3 pl-8 cursor-pointer mx-3 hover:bg-gray-600 rounded' onClick={()=>{navigate("/classify",{replace:true})}}>
            <img className='w-7' src={classifier} alt="" />
            <button className='font-bold' >Genre Classification</button>
        </div>
        <div className='flex h-[10%] items-center gap-2 pl-9 cursor-pointer mx-3 mb-3 hover:bg-gray-600 rounded' onClick={()=>{navigate("/topthemes",{replace:true})}}>
            <img className='w-7' src={icon} alt="" />
            <button className='font-bold' >Trending Themes</button>
        </div>
      </div>
      
    </div>
    </>

  )
}

export default Sidebar
