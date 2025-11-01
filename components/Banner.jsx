import React, { useEffect, useState } from 'react'
import banner_img from "../src/assect/banner.jpg"

export default function Banner() {
  const initialtime = 5 * 60 * 60
  const [time,settime] = useState(initialtime)
  const calculatetime = (timing) => {
    useEffect(() => {
      const timer = setInterval(() => {
        settime(prev => (prev > 0 ? prev - 1 : 0))
      }, 1000)

      // Cleanup when unmount
      return () => clearInterval(timer)
    }, [])
    const hours = Math.floor(timing / 3600)
    const min = Math.floor((time % 3600) / 60)
    const sec = time % 60
    return{
      hours : String(hours).padStart(2,'0'),
      min : String(min).padStart(2,'0'),
      sec : String(sec).padStart(2,'0')
    }
  }
  const  {hours,min,sec} = calculatetime(time)
  return (
    <section className='w-full md:h-[70vh] h-[90vh]  mt-[14vh] bg-cover  bg-no-repeat bg-[68%_0%] md:bg-top shadow-2xl ' style={{backgroundImage:`url(${banner_img})`}}>
        <div className='mx-auto md:px-16 px-7 flex flex-col md:justify-center h-full md:gap-y-3.5 gap-y-6 select-none py-20'>
            <h1 className='text-red-600 md:text-9xl text-7xl uppercase font-bold tracking-tight'>Big Sale!</h1>
            <h2 className='md:text-blue-600 text-3xl md:text-4xl text-white bg-blue-600 px-2 py-1.5 rounded-lg md:bg-transparent'>Up to 50% OFF - Limited Time Only!</h2>
            <div className='flex md:gap-x-3 gap-x-1 md:text-6xl text-5xl font-bold mt-6'>
                <span className='text-5xl text-bold bg-zinc-800 text-white px-3 py-1.5 md:py-0'>{hours}</span>:
                <span className='text-5xl text-bold bg-zinc-800 text-white px-3 py-1.5 md:py-0'>{min}</span>:
                <span className='text-5xl text-bold bg-zinc-800 text-white px-3 py-1.5 md:py-0'>{sec}</span>
            </div>

        </div>

    </section>
  )
}
