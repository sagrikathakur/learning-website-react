import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'

const MyCourses = () => {
  const { allCourses, currency } = useContext(AppContext);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    if (allCourses) {
      setMyCourses(allCourses); // Using allCourses for demo purposes
    }
  }, [allCourses]);

  return (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
        <div className='bg-white shadow-sm border border-gray-100 rounded-md w-full max-w-6xl overflow-hidden'>
          <table className='w-full'>
            <thead className='text-gray-900 border-b border-gray-200 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold'>All Courses</th>
                <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Earnings</th>
                <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Students</th>
                <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Published On</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
              {myCourses.map((course, index) => (
                <tr key={index} className='border-b border-gray-200 hover:bg-gray-50'>
                  <td className='px-4 py-3 flex items-center gap-3'>
                    <img src={course.courseThumbnail} alt="course" className='w-24 sm:w-28 rounded-md' />
                    <div>
                      <p className='font-medium text-gray-800 truncate'>{course.courseTitle}</p>
                    </div>
                  </td>
                  <td className='px-4 py-3 hidden sm:table-cell'>
                    {currency}{Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
                  </td>
                  <td className='px-4 py-3 hidden sm:table-cell'>{course.enrolledStudents.length}</td>
                  <td className='px-4 py-3 hidden sm:table-cell'>{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyCourses