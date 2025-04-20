'use client'
import React from 'react'
import { servicesdataleft } from '@/app/lib/constant'
import { servicesdataright} from '@/app/lib/constant'
import { motion } from 'framer-motion'

const ServiceSecOne = () => {
  return (
    <div className="bg-black bg-blend-darken py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side */}
        <motion.div 
          className="bg-white p-6 shadow-md"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true}}
        >
          <ul className="space-y-6">
            {servicesdataleft.map((item, index) => (
              <li key={index} className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-bold">{item.title} - {item.price}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right side */}
        <motion.div 
          className="bg-black p-6 border border-amber-900 shadow-md"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7}}
          viewport={{ once: true }}
        >
          <ul className="space-y-6 text-white">
            {servicesdataright.map((item, index) => (
              <li key={index} className="border-b border-gray-700 pb-4">
                <h3 className="text-xl font-bold text-amber-700">{item.title} - {item.price}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default ServiceSecOne