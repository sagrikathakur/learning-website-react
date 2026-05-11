import React, { useContext, useEffect, useState } from 'react'
import { dummyDashboardData, assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // In a real app, fetch from API. Here we use dummy data.
    setDashboardData(dummyDashboardData);
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='space-y-5 w-full'>
        <div className='flex flex-wrap gap-5'>
          <div className='flex items-center gap-4 bg-white p-6 rounded-md shadow-sm border border-gray-100 w-64'>
            <img src={assets.patients_icon} alt="icon" className='w-12 h-12' />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.enrolledStudentsData.length}</p>
              <p className='text-base text-gray-500'>Total Enrollments</p>
            </div>
          </div>
          <div className='flex items-center gap-4 bg-white p-6 rounded-md shadow-sm border border-gray-100 w-64'>
            <img src={assets.appointments_icon} alt="icon" className='w-12 h-12' />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalCourses}</p>
              <p className='text-base text-gray-500'>Total Courses</p>
            </div>
          </div>
          <div className='flex items-center gap-4 bg-white p-6 rounded-md shadow-sm border border-gray-100 w-64'>
            <img src={assets.earning_icon} alt="icon" className='w-12 h-12' />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{currency}{dashboardData.totalEarnings}</p>
              <p className='text-base text-gray-500'>Total Earnings</p>
            </div>
          </div>
        </div>

        <div className='bg-white shadow-sm border border-gray-100 rounded-md w-full max-w-4xl'>
          <div className='flex items-center gap-2.5 px-4 py-4 border-b border-gray-100 rounded-t-md'>
            <img src={assets.person_tick_icon} alt="icon" />
            <p className='font-semibold text-lg'>Latest Enrollments</p>
          </div>
          <div className='pt-4 pb-8'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='text-gray-900 border-b border-gray-200 text-sm text-left'>
                  <tr>
                    <th className='px-4 py-3 font-semibold'>Student</th>
                    <th className='px-4 py-3 font-semibold'>Course Title</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-gray-500'>
                  {dashboardData.enrolledStudentsData.map((item, index) => (
                    <tr key={index} className='border-b border-gray-200 hover:bg-gray-50'>
                      <td className='px-4 py-3 flex items-center gap-3'>
                        <img src={item.student.imageUrl} alt="student" className='w-10 h-10 rounded-full' />
                        <span className='font-medium text-gray-800'>{item.student.name}</span>
                      </td>
                      <td className='px-4 py-3'>{item.courseTitle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard