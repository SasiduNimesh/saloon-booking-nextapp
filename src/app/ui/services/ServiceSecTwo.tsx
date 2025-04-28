import React from 'react'
import { faqdata } from '@/app/lib/constant'

const ServiceSecTwo = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
      <div className="flex items-center justify-around w-full mb-6 " data-aos="fade-down">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            FAQ
          </h2>
        <div className="border-t-2 border-amber-600 border-dashed w-1/2"></div>
      </div>
      <div className="max-w-4xl w-full p-6 rounded-lg shadow-md border-2 border-amber-600 mt-6" data-aos="fade-down">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-left">
          {faqdata.map((faq, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceSecTwo