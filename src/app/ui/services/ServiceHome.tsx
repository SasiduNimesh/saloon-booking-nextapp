'use client'
import React from "react";
import Image from "next/image";
import { FaCut } from "react-icons/fa";
import Link from "next/link";
import "./style.css";
import { motion } from 'framer-motion'

const ServiceHome = () => {
  return (
    <div className="relative w-full h-[500px]">
      <div className="absolute inset-0">
        <Image
          src="/images/serviceHomeImg.jpg"
          alt="Hodor Barber"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-75"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-6">
        <motion.div
          className="flex items-center space-x-4 mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-50 border-t border-dashed border-white"></div>
          <FaCut size={40} className="rotate-270" />
          <div className="w-50 border-t border-dashed border-white"></div>
        </motion.div>

        <motion.h1 
          className="text-3xl md:text-5xl font-bold uppercase mt-2 diplomata-sc-regular"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false , amount:0.2 }}
        >
          <Link
            href="/book"
            className="mt-6 px-6 py-3 border border-white text-white uppercase font-semibold tracking-wide transition duration-300 hover:bg-white hover:text-black"
          >
            Book An Appointment
          </Link>
        </motion.div>
        
      </div>
    </div>
  );
};

export default ServiceHome;
