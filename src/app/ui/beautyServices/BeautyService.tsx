"use client"
import Image from "next/image";
import React, { useState , useEffect } from "react";
import { FaClock, FaPlus } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";
import AddBeautyService from "./AddBeautyService";
import { useSession } from "next-auth/react";

type Service = {
    id: number;
    name: string;
    price: string;
    duration: string;
    image: string;
};

const BeautyService = () => {
    const [showForm, setShowForm] = useState(false);
      const [services, setServices] = useState<Service[]>([]);
      const { data: session, status } = useSession();
      const isOwner = status === "authenticated" && session?.user?.role === "owner";

    
      const handleContinue = () => {
        document.getElementById("booking-service")?.click();
      };
    
      const fetchServices = async () => {
        const response = await fetch("http://localhost:3000/api/beautyService");
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data);
      };
      
      useEffect(() => {
        fetchServices();
      }, []);
      
     
      return (
        <div>
          {isOwner ? (
            <button
            type="button"
            className="flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
            onClick={() => setShowForm(true)}
            >
              <FaPlus />
              Add Beauty Service
            </button>
          ):null}
          
          <div className="flex gap-2">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col rounded-lg overflow-hidden shadow-lg bg-white p-2 w-50">
                <div className="bg-green-300 rounded-lg opacity-45 p-1 w-1/3 mb-1">
                  <h2 className="font-bold text-sm text-center">Service</h2>
                </div>
                <Image
                  className="flex items-center justify-center w-full rounded-lg"
                  src={service.image}
                  alt={service.name}
                  width={200}
                  height={200}
                />
                <div className="px-2 py-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-1 text-sm">
                      <FaFolder />
                      {service.name}
                    </span>
                    <span className="text-gray-600 flex items-center gap-1 text-sm">
                      <FaClock />
                      {service.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-500 font-semibold text-sm">${service.price}</span>
                    <button
                      className="bg-amber-600 text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
                      onClick={handleContinue}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isOwner && showForm && <AddBeautyService
            setShowForm={setShowForm}
            onServiceAdded={() => {
              // Fetch updated list
              fetchServices();
          }}
      />}
        </div>
      );
}

export default BeautyService