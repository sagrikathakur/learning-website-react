import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/educator/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ]

  return (
    <div className='w-16 md:w-64 border-r border-gray-200 bg-white min-h-[calc(100vh-73px)] shadow-sm'>
      <div className='flex flex-col gap-2 pt-6 px-2 md:px-4'>
        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path}
            end={item.path === '/educator/educator'}
            className={({isActive}) => `flex items-center gap-3 px-3 md:px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <img src={item.icon} alt={item.name} className='w-5 h-5 opacity-80' />
            <span className='font-medium hidden md:block'>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar