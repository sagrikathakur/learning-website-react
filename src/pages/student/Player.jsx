import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import humanizeDuration from 'humanize-duration'
import { assets } from '../../assets/assets'
import YouTube from 'react-youtube'

const Player = () => {
  const { courseId } = useParams()
  const { enrolledCourses } = useContext(AppContext)
  
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)
  
  useEffect(() => {
    if (enrolledCourses && enrolledCourses.length > 0) {
      const findCourse = enrolledCourses.find(course => course._id === courseId)
      if (findCourse) {
        setCourseData(findCourse)
        // Set the first lecture as the default playing video
        if (findCourse.courseContent.length > 0 && findCourse.courseContent[0].chapterContent.length > 0) {
           setPlayerData(findCourse.courseContent[0].chapterContent[0])
        }
      }
    }
  }, [enrolledCourses, courseId])
  
  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  if (!courseData) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading Player...</p></div>
  }
  
  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-3 gap-10 md:px-36 mb-16'>
        
        {/* left column - Course Structure */}
        <div className='text-gray-800 md:col-span-1'>
          <h2 className='text-xl font-semibold mb-5'>Course Structure</h2>
          <div className='border border-gray-200 rounded-lg overflow-hidden bg-white'>
            {courseData.courseContent.map((chapter, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <div 
                  className="flex justify-between items-center bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-2 font-medium text-gray-800">
                    <img src={assets.down_arrow_icon} alt="arrow" className={`w-4 h-4 transition-transform duration-200 ${openSections[index] ? 'rotate-180' : ''}`} />
                    <h3 className='text-sm md:text-base'>{chapter.chapterTitle}</h3>
                  </div>
                </div>
                
                {openSections[index] && (
                  <div className="px-4 py-2">
                    {chapter.chapterContent.map((lecture, i) => (
                      <div 
                        key={i} 
                        onClick={() => setPlayerData(lecture)}
                        className={`flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 ${playerData && playerData.lectureId === lecture.lectureId ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                      >
                        <div className="flex items-center gap-2">
                          <img src={lecture.isPreviewFree ? assets.play_icon : assets.lesson_icon} alt="icon" className="w-3.5 h-3.5 opacity-70" />
                          <span className="text-sm">{lecture.lectureTitle}</span>
                        </div>
                        <span className="text-xs text-gray-500">
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

        {/* right-column - Video Player */}
        <div className='md:col-span-2'>
           {playerData ? (
             <div>
               <div className='relative overflow-hidden rounded-lg bg-black aspect-video mb-4 shadow-md'>
                 <YouTube 
                   videoId={playerData.lectureUrl.split('/').pop()}
                   opts={{
                     width: '100%',
                     height: '100%',
                     playerVars: {
                       autoplay: 1,
                     },
                   }}
                   className="w-full h-full absolute inset-0"
                   iframeClassName="w-full h-full"
                 />
               </div>
               <h2 className='text-2xl font-bold text-gray-800 mt-4'>{playerData.lectureTitle}</h2>
             </div>
           ) : (
             <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
               <p className="text-gray-500">Select a lecture to start playing.</p>
             </div>
           )}
        </div>
      </div>
    </>
  )
}

export default Player