"use client";

import { useState } from "react";
import { FaFeather, FaNotesMedical, FaPalette } from "react-icons/fa";
import { FaPowerOff, FaServicestack, FaTicket } from "react-icons/fa6";
import HairService from "./hairServices/HairService";
import BeautyService from "./beautyServices/BeautyService";
import BookService from "./BookService";
import Report from "./Report";
import DashboardDis from "./DashboardDis";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const handleLogout = async () => {
    await signOut({ redirect: false });
  };
  

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center space-y-8"
      style={{ backgroundImage: "url('/images/tools3.avif')" }}
    >
      <div className="w-[1100px] h-[490px] flex rounded-lg overflow-hidden shadow-2xl">
        <div className="w-64 h-full bg-gray-900 text-white flex flex-col p-4 mx-2 rounded-lg">
          <p className="text-xl font-bold mb-6">LUCKY SALON</p>
          <ul className="flex flex-col space-y-2">
            <li
              className={`${
                activeSection === "Dashboard"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              } flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer`}
              onClick={() => setActiveSection("Dashboard")}
            >
              <FaPalette />
              Dashboard
            </li>
            <li
              className={`${
                activeSection === "Hair Services"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              } flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer`}
              onClick={() => setActiveSection("Hair Services")}
            >
              <FaFeather />
              Hair Services
            </li>
            <li
              className={`${
                activeSection === "Beauty Services"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              } flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer`}
              onClick={() => setActiveSection("Beauty Services")}
            >
              <FaServicestack />
              Beauty Services
            </li>
            <li
              id="booking-service"
              className={`${
                activeSection === "Booking Service"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              } flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer`}
              onClick={() => setActiveSection("Booking Service")}
            >
              <FaTicket />
              Booking Service
            </li>
            <li
              className={`${
                activeSection === "Appointments" ? "bg-gray-700" : "hover:bg-gray-700"
              } flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer`}
              onClick={() => setActiveSection("Appointments")}
            >
              <FaNotesMedical />
              Appointments
            </li>
            <Link href="/">
              <li 
                className="hover:bg-gray-700 flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer"
                onClick={handleLogout}
              >
                <FaPowerOff />
                Log Out
              </li>
            </Link>
          </ul>
        </div>

        {/* Content display window */}
        <div className="flex-1 flex flex-col rounded-lg h-full">
          <div className="p-4 bg-sky-950 shadow text-center text-lg text-white font-semibold rounded-t-lg">
            Booking Appointment System
          </div>
          <div className="p-4 transition-all duration-300 bg-gray-500/40 backdrop-blur-md brightness-110 h-full rounded-b-lg flex-1 overflow-auto">
            {activeSection === "Dashboard" && <DashboardDis />}
            {activeSection === "Hair Services" && <HairService />}
            {activeSection === "Beauty Services" && <BeautyService />}
            {activeSection === "Booking Service" && <BookService />}
            {activeSection === "Appointments" && <Report />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
