import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  useEffect(() => {
    setEnrolledStudents(dummyStudentEnrolled);
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>Students Enrolled</h2>
        <div className='bg-white shadow-sm border border-gray-100 rounded-md w-full max-w-4xl overflow-hidden'>
          <table className='w-full'>
            <thead className='text-gray-900 border-b border-gray-200 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold'>#</th>
                <th className='px-4 py-3 font-semibold'>Student Name</th>
                <th className='px-4 py-3 font-semibold'>Course Title</th>
                <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Date</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
              {enrolledStudents.map((item, index) => (
                <tr key={index} className='border-b border-gray-200 hover:bg-gray-50'>
                  <td className='px-4 py-3 font-medium text-gray-800'>{index + 1}</td>
                  <td className='px-4 py-3 flex items-center gap-3'>
                    <img src={item.student.imageUrl} alt="student" className='w-10 h-10 rounded-full' />
                    <span className='font-medium text-gray-800'>{item.student.name}</span>
                  </td>
                  <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                  <td className='px-4 py-3 hidden sm:table-cell'>{new Date(item.purchaseDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StudentsEnrolled