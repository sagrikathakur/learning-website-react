import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import Sidebar from '../../components/educator/Sidebar'
import Footer from '../../components/educator/Footer'

const Educator = () => {
  return (
    <div className='text-default min-h-screen bg-gray-50 flex flex-col'>
      <Navbar />
      <div className='flex flex-1'>
        <Sidebar />
        <div className='flex-1 flex flex-col'>
          <div className='flex-1 p-6 md:p-10'>
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Educator