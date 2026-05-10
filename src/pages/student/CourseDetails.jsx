import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'
import humanizeDuration from 'humanize-duration'

const CourseDetails = () => {
  const { id } = useParams()
  const { allCourses, calculateRating, currency } = useContext(AppContext)
  
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const findCourse = allCourses.find(course => course._id === id)
      setCourseData(findCourse)
    }
  }, [allCourses, id])
  
  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }
  
  if (!courseData) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading...</p></div>
  }
  
  const rating = calculateRating(courseData)
  
  // Calculate total lectures and duration
  let totalLectures = 0
  let totalDuration = 0
  courseData.courseContent.forEach(chapter => {
    totalLectures += chapter.chapterContent.length
    chapter.chapterContent.forEach(lecture => {
      totalDuration += lecture.lectureDuration
    })
  })
  
  const finalPrice = (courseData.coursePrice - (courseData.coursePrice * courseData.discount / 100)).toFixed(2)

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left bg-gray-50 mb-16 pb-16">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Left Column */}
          <div className="flex-1 md:w-2/3">
            <p className="text-sm text-gray-500 mb-4">
              <span className="cursor-pointer text-blue-600 hover:underline">Home</span> / 
              <span className="cursor-pointer text-blue-600 hover:underline ml-1">Courses</span> / 
              <span className="ml-1">{courseData.courseTitle}</span>
            </p>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{courseData.courseTitle}</h1>
            
            <div dangerouslySetInnerHTML={{ __html: courseData.courseDescription }} className="text-gray-600 mb-6 prose prose-blue max-w-none" />
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-800">{rating > 0 ? rating.toFixed(1) : 'No Ratings'}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={i < Math.floor(rating) ? assets.star : assets.star_blank} alt="star" className="w-4 h-4" />
                  ))}
                </div>
                <span className="ml-1">({courseData.courseRatings.length} ratings)</span>
              </div>
              <div className="flex items-center gap-1">
                <img src={assets.user_icon} alt="students" className="w-4 h-4" />
                <span>{courseData.enrolledStudents.length} students</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Curriculum</h2>
            
            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
              <p>{courseData.courseContent.length} sections • {totalLectures} lectures • {humanizeDuration(totalDuration * 1000 * 60, { units: ['h', 'm'], round: true })} total length</p>
            </div>
            
            {/* Accordion */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <div 
                    className="flex justify-between items-center bg-gray-50 px-5 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2 font-medium text-gray-800">
                      <img src={assets.down_arrow_icon} alt="arrow" className={`w-4 h-4 transition-transform duration-200 ${openSections[index] ? 'rotate-180' : ''}`} />
                      <h3>{chapter.chapterTitle}</h3>
                    </div>
                    <div className="text-sm text-gray-500 hidden sm:block">
                      {chapter.chapterContent.length} lectures
                    </div>
                  </div>
                  
                  {openSections[index] && (
                    <div className="px-5 py-2">
                      {chapter.chapterContent.map((lecture, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center gap-3">
                            <img src={lecture.isPreviewFree ? assets.play_icon : assets.lesson_icon} alt="icon" className="w-4 h-4 opacity-70" />
                            <span className="text-gray-700 text-sm md:text-base">{lecture.lectureTitle}</span>
                            {lecture.isPreviewFree && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded ml-2 font-medium">Preview</span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {humanizeDuration(lecture.lectureDuration * 1000 * 60, { units: ['h', 'm'], round: true })}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Sticky Sidebar */}
          <div className="md:w-1/3">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sticky top-24">
              <div className="relative">
                <img src={courseData.courseThumbnail} alt={courseData.courseTitle} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                   <img src={assets.play_icon} alt="play" className="w-16 h-16 opacity-90 hover:opacity-100 cursor-pointer" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-3xl font-bold text-gray-800">{currency}{finalPrice}</span>
                  {courseData.discount > 0 && (
                    <>
                      <span className="text-lg text-gray-500 line-through mb-1">{currency}{courseData.coursePrice}</span>
                      <span className="text-sm font-medium text-green-600 mb-1.5">{courseData.discount}% off</span>
                    </>
                  )}
                </div>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors mb-4">
                  Enroll Now
                </button>
                
                <p className="text-center text-xs text-gray-500 mb-6">30-Day Money-Back Guarantee</p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">This course includes:</h4>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <img src={assets.time_clock_icon} alt="time" className="w-5 h-5 opacity-70" />
                    <span>{humanizeDuration(totalDuration * 1000 * 60, { units: ['h', 'm'], round: true })} on-demand video</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <img src={assets.lesson_icon} alt="lessons" className="w-5 h-5 opacity-70" />
                    <span>{totalLectures} downloadable resources</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <img src={assets.person_tick_icon} alt="access" className="w-5 h-5 opacity-70" />
                    <span>Full lifetime access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CourseDetails