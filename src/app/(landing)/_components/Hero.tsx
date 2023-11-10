import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
        <div className="flex items-center">
            <div className='h-[300px] w-[300px] relative md:h-[400px] md:w-[400px] sm:w-[350px] sm:h-[350px]'>
                <Image src='/documents.png' alt='documents' fill className='object-contain'/>
            </div>
            <div className='h-[400px] w-[400px] relative hidden md:block'>
                <Image src='/reading.png' alt='Reading' fill/>
            </div>
        </div>

    </div>
  )
}

export default Hero