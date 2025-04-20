import React from 'react'
import Image from 'next/image'
import { FaAngleRight, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6'

const HomeAbout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-around gap-8 md:flex-row bg-gray-900 text-white px-6 md:px-16 py-12">
      {/* Left Section */}
      <div className="flex flex-col space-y-6">
        <h1 className="text-4xl font-bold text-amber-600">LUCKY</h1>

        <ul className="flex flex-col space-y-4 text-xl font-semibold">
          <li className="hover:text-amber-900 cursor-pointer flex space-x-3 items-center hover:translate-x-1.5"><FaAngleRight />SERVICES & PRICING</li>
          <li className="hover:text-amber-900 cursor-pointer flex space-x-3 items-center hover:translate-x-1.5"><FaAngleRight />BARBERS</li>
          <li className="hover:text-amber-900 cursor-pointer flex space-x-3 items-center hover:translate-x-1.5"><FaAngleRight />ABOUT US</li>
          <li className="hover:text-amber-900 cursor-pointer flex space-x-3 items-center hover:translate-x-1.5"><FaAngleRight />BOOKING</li>
          <li className="hover:text-amber-900 cursor-pointer flex space-x-3 items-center hover:translate-x-1.5"><FaAngleRight />JOIN OUR TEAM</li>
          <li className="hover:text-amber-900 cursor-pointer flex space-x-3 items-center hover:translate-x-1.5"><FaAngleRight />CONTACT</li>
        </ul>

        <div className="mt-6 text-gray-400 text-lg">
          <p>Mon - Fri: 7am - 10pm</p>
          <p>Saturday: 8am - 10pm</p>
          <p>Sunday: 8am - 11pm</p>
        </div>

        <div className="flex space-x-6 mt-6 text-2xl">
          <a href="#" className="text-gray-400 hover:text-amber-600 transition">
            <FaFacebook />
          </a>
          <a href="#" className="text-gray-400 hover:text-amber-600 transition">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-400 hover:text-amber-600 transition">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center">
        <Image
            src="/images/aboutImg1.jpg"
            alt="Barber Shop"
            width={350}
            height={600}
            className="hidden md:block rounded-lg w-full h-full"
        />
      </div>

    </div>

  )
}

export default HomeAbout