import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-5 border-t border-gray-200 bg-white text-sm text-gray-500 mt-auto'>
      <div className='flex items-center gap-2 mb-3 md:mb-0'>
        <img src={assets.logo_dark} alt="logo" className='w-20' />
        <span className='hidden md:inline'>|</span>
        <span>© 2026 Vite-Teach. All rights reserved.</span>
      </div>
      <div className='flex items-center gap-4'>
        <a href="#" className='hover:text-gray-800 transition-colors'>Terms</a>
        <a href="#" className='hover:text-gray-800 transition-colors'>Privacy</a>
        <a href="#" className='hover:text-gray-800 transition-colors'>Help</a>
      </div>
    </div>
  )
}

export default Footer
