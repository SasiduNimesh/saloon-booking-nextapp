"use client"
import { testimonials } from '@/app/lib/constant'
import React, { useState } from 'react'
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';

const HomeTestimonial = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 border-6 border-double border-amber-600">
      
      <div className="flex items-center justify-center w-full mb-6">
        <div className="border-t-2 border-amber-600 w-1/4"></div>
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" data-aos="fade-up-right">TESTIMONIALS</h2>
        <div className="border-t-2 border-amber-600 w-1/4"></div>
      </div>

      <div className="max-w-3xl text-center">
        <p className="text-gray-300 text-lg italic mb-4" data-aos="fade-up-left">
          {testimonials[currentIndex].quote}
        </p>
        <p className="text-amber-600 font-semibold" data-aos="fade-up-right">
          {testimonials[currentIndex].author}
        </p>
      </div>

      <div className="flex space-x-4 mt-6" data-aos="fade-up-left">
        <AiOutlineLeftCircle
          size={40}
          onClick={handlePrev}
          className="hover:bg-amber-800 hover:scale-125 text-white rounded-full transition cursor-pointer"
        />
        
        <AiOutlineRightCircle
          size={40}
          onClick={handleNext}
          className="hover:bg-amber-800 hover:scale-125 text-white rounded-full cursor-pointer"
          data-aos="fade-down"
        />
          
      </div>

      <div className="flex space-x-2 mt-4">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-amber-600" : "bg-gray-500"
            }`}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default HomeTestimonial