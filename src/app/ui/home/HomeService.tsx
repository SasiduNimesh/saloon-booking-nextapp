import { services } from '@/app/lib/constant'
import React from 'react'

const HomeService = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-8">
        <div className="flex items-center justify-center w-full mb-6 space-x-6">
            <div className="border-t-2 border-amber-600 w-1/4"></div>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Services
            </h2>
            <div className="border-t-2 border-amber-600 w-1/4"></div>
        </div>
      <div className="max-w-4xl w-full p-6 rounded-lg shadow-md border-2 border-amber-600 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
                <div key={index}>
                <h3 className="text-lg font-semibold text-sky-500">
                    {service.title} - {service.price}
                </h3>
                <p className="text-white mt-2">{service.description}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default HomeService