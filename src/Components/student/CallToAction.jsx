import React from 'react'
import {assets} from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
<h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Learn anything , anytime , anywhere</h1>
<p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto text-center sm:text-sm">
  The journey to a better you begins with a single step — and that step starts here. Our learning platform is built for dreamers, doers, and those who never stop growing. With expert guidance, interactive lessons, and a supportive learning environment, you’ll gain the confidence and skills you need to thrive in today’s world. Whether it’s tech, design, business, or personal development, every course brings you closer to your goals. Embrace the opportunity to learn something new, challenge yourself, and unlock your full potential. Start today — because growth waits for no one.
</p>

<div className='flex items-center font-medium gap-6 mt-4'>
  <button className='px-10 py-3 rounded-md text-md text-white bg-blue-600'>Get Started</button>
  <button className='flex items-center gap-2' >Learn More  <img src={assets.arrow_icon} alt="arrow_icon" /> </button>
</div>
    </div>
  )
}

export default CallToAction