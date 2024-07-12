import React, { useState } from 'react'
import { TypeAnimation } from 'react-type-animation';

import './HomeContent.css'
import tabgi from '../assets/assets/Music On Hold _ How To Keep It Fresh with Music On Hold.jpg'
import mgbgi from '../assets/assets/rmc_uddannelse_music_management_0.jpg'
import { useNavigate } from 'react-router-dom';

// const ExampleComponent = () => {
//   return (
    
//   );
// };

export default function HomeContent() {
  const navigate = useNavigate()
  const genres = ["blues","classical","country","hiphop","jazz","pop","reggae","rock"]
  
  return (
    <div className='w-[80%] h-full p-2 pt-0 pl-1 flex-col gap-2 text-white lg:flex bg-violet-950'>
      <div className='bg-black h-[100%] rounded flex flex-col '>
        <div className='h-[50%] flex items-center m-4 mb-2 relative border border-violet-800 rounded-lg'>
            <img className='w-full h-full object-cover absolute mix-blend-screen border opacity-30 blur-sm' src={tabgi} alt=""/>
            <div className='pl-10 justify-around'><div class="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-50/60 to-50% to-slate-100 pb-1">A Music Genre Classification for <span className='text-teal-600'><TypeAnimation
                sequence={[
                  "BLUES",1000,"CLASSICAL",1000,"COUNTRY",1000,"DISCO",1000,"HIPHOP",1000,"JAZZ",1000,"METAL",1000,"POP",1000,"REGGAE",1000,"ROCK",1000
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '1em', display: 'inline-block' }}
                repeat={Infinity}
              /></span>
              <div><span className='pr-2' style={{ fontSize: '0.5em'}}>Wanna Try it?</span>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={()=>{navigate("/classify",{replace:true})}}>
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ">
              Learn More </span>
              <svg
                  className="size-5 rtl:rotate-180 mx-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              </div>
            </div> 
            </div>
        </div>
        <div className='h-[50%] flex items-center m-4 mt-2 relative border border-violet-800 rounded-lg'>
        <img className='w-full h-full object-cover absolute mix-blend-screen border opacity-30 blur-sm' src={mgbgi} alt=""/>
            <div className='pl-10 justify-around'><div class="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-50/60 to-50% to-slate-100 pb-1">Current Top Songs Thematic Analysis
            <div><span className='pr-2' style={{ fontSize: '0.5em'}}>Wanna Try it?</span>
              <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={()=>{navigate("/topthemes",{replace:true})}}>
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ">
              Learn More </span>
              <svg
                  className="size-5 rtl:rotate-180 mx-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
