import React from 'react'
import Sidebar from './Sidebar'
import Nav from './Nav'
import MusicClassContent from './MusicClassContent'

export default function MusicClass() {
  return (
    <div className='h-screen' >
      <div className='h-[10%] flex'>
        <Nav/>
      </div>
      
      <div className='h-[90%] flex '>
        <Sidebar/>
        <MusicClassContent/>
      </div>
    </div>
  )
}

