import React from 'react'
import Sidebar from './Sidebar'
import Nav from './Nav'
import ThemeContent from './ThemeContent'

export default function Theme() {
  return (
    <div className='h-screen' >
      <div className='h-[10%] flex'>
        <Nav/>
      </div>
      
      <div className='h-[90%] flex '>
        <Sidebar/>
        <ThemeContent/>
      </div>
    </div>
    
  )
}