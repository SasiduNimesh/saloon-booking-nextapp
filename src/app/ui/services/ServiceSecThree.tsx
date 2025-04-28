import Link from 'next/link'
import React from 'react'
import { FaCut } from 'react-icons/fa'
import Image from 'next/image'

const ServiceSecThree = () => {
  return (
    <div className="relative w-full h-[500px]">
        <div className="absolute inset-0 bg-black opacity-90">
            <Image
              src="/images/tools.jpg" 
              alt="Hodor Barber"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="brightness-50"
            />
        </div>

        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-6">
                
            <div className="flex items-center space-x-4 mb-4" data-aos="fade-left">
                <div className="w-50 border-t border-dashed border-white"></div>
                  <FaCut size={40} className="rotate-270" />
                <div className="w-50 border-t border-dashed border-white"></div>
            </div>
        
            <h1 
            className="text-5xl md:text-7xl font-bold uppercase mt-2" data-aos="fade-right">
                Our Services
            </h1>

            <Link
            href="/book"
            className="mt-6 px-6 py-3 border border-white text-white uppercase font-semibold tracking-wide transition duration-300 hover:bg-white hover:text-black" 
            data-aos="fade-left"
            >
            Book An Appointment
            </Link>
       
        </div>
    </div>
  )
}

export default ServiceSecThree