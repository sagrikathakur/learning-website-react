import React, { useState } from 'react'

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Course added successfully (dummy)!");
    setCourseTitle('');
    setCourseDescription('');
    setCoursePrice(0);
  }

  return (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='bg-white shadow-sm border border-gray-100 rounded-md w-full max-w-3xl p-6'>
        <h2 className='text-xl font-medium mb-6'>Add New Course</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Course Title</label>
            <input 
              type="text" 
              value={courseTitle} 
              onChange={(e) => setCourseTitle(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Type here"
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Course Description</label>
            <textarea 
              value={courseDescription} 
              onChange={(e) => setCourseDescription(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32'
              placeholder="Type here"
              required
            ></textarea>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Course Price</label>
            <input 
              type="number" 
              value={coursePrice} 
              onChange={(e) => setCoursePrice(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="0"
              required
            />
          </div>
          <button type="submit" className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors'>
            ADD COURSE
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCourse