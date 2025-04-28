'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RiShoppingBag3Line } from 'react-icons/ri';

const BookSecOne = () => {

  const [hairCount, setHairCount] = useState(0);
  const [beautyCount, setBeautyCount] = useState(0);
  
  const fetchCounts = async () => {
    const res = await fetch('http://localhost:3000/api/serviceCount');
    const data = await res.json();
    setHairCount(data.hairCount);
    setBeautyCount(data.beautyCount);
  };
  
  useEffect(() => {
    fetchCounts();
  }, []);

  const services = [
    { title: 'Hair Services', count: hairCount },
    { title: 'Beauty Services', count: beautyCount },
  ];
  return (
    <div className="py-12 bg-gradient-to-r from-gray-800 to-purple-800 text-center">
      <h2 className="text-3xl font-bold text-white" data-aos="fade-right">Book Our Services Now</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto px-4" data-aos="fade-down">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center border border-gray-200"
          >
            <h3 className="text-lg font-semibold mt-2">{service.title}</h3>
            <p className="text-gray-600 flex items-center">
              <RiShoppingBag3Line className="text-sky-800 mr-1" />
              {service.count}
            </p>
            <hr className="bg-gray-900 w-full my-2" />
            <Link href="/dashboard">
              <button className="mt-3 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 cursor-pointer">
                View All &gt;
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSecOne;