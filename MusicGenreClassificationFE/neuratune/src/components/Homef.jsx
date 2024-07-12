import React from 'react'
import Sidebar from './Sidebar'
import Nav from './Nav'
import HomeContent from './HomeContent'

export default function Homef() {
  return (
    <div className='h-screen' >
      <div className='h-[10%] flex'>
        <Nav/>
      </div>
      
      <div className='h-[90%] flex '>
        <Sidebar/>
        <HomeContent/>
      </div>
    </div>
    
  )
}