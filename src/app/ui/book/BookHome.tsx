'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { FaCut } from 'react-icons/fa'
import "./style.css"
import AOS from "aos";
import "aos/dist/aos.css";

const BookHome = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="relative w-full h-[500px]">
        <div className="absolute inset-0">
            <Image
              src="/images/homeImg1.webp" 
              alt="Hodor Barber"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="brightness-75"
            />
        </div>

        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-6">
                
            <div className="flex items-center space-x-4 mb-4" data-aos="zoom-in-up">
                <div className="w-50 border-t border-dashed border-white"></div>
                  <FaCut size={40} className="rotate-270" />
                <div className="w-50 border-t border-dashed border-white"></div>
            </div>
        
            <h1 
            className="text-3xl md:text-5xl font-bold uppercase mt-2 diplomata-sc-regular" data-aos="zoom-in-down">
                Book Now
            </h1>
       
        </div>
    </div>
  )
}

export default BookHome