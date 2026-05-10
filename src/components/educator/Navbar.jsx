import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-4 sm:px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm'>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer'/>
      </Link>
      <div className='flex items-center gap-5'>
        <p className="text-sm font-medium text-gray-500 hidden md:block">Educator Dashboard</p>
        <UserButton />
      </div>
    </div>
  )
}

export default Navbar