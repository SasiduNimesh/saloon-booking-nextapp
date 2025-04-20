"use client"
import { navLinks } from "@/app/lib/constant";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiBars3BottomRight } from "react-icons/hi2";
import { usePathname } from "next/navigation";

type Props = {
  openNav: () => void;
  showLogin: boolean;
  showSignup: boolean;
};

const Nav = ({ openNav }: Props) => {
    const [navbg , setNavbg] = useState(false);
    const pathname = usePathname();

    useEffect(()=>{
        const handler = () => {
            if (window.scrollY >= 90) setNavbg(true);
            if (window.scrollY < 90) setNavbg(false);
        }
        window.addEventListener('scroll' , handler);
        return () => window.removeEventListener('scroll' , handler);
    },[])

  return (
    <div className={`transition-all ${navbg? 'bg-white opacity-95 shadow-md': 'fixed'} duration-200 h-[12vh] fixed w-full z-[100]`}>
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[85%] mx-auto">
        
        <div className="flex items-center justify-center space-x-2 object-cover bg-gray-400 rounded-full p-2">
          <Link href="/">
            <Image 
                src="/images/salonlogo.png"   
                alt="Hodor Salon Logo" 
                width={45}        
                height={45}       
                className="object-cover" 
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            return (
              <Link
                href={link.url}
                key={link.id}
                className={`font-bold transition-all duration-200 ${
                  pathname === link.url
                    ? "text-sky-600 border-b-2 border-sky-700"
                    : navbg
                    ? "text-black hover:text-sky-600"
                    : "text-white hover:text-sky-600"
                }`}>
                <p>{link.label}</p>
              </Link>
            );
          })}
        </div>

        {/* https://devdojo.com/tailwindcss/buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
          >
            <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="relative z-20 flex items-center text-sm">
             Login
            </span>
          </Link>

          <HiBars3BottomRight
            onClick={openNav}
            className={`${navbg? 'text-black': 'text-white'} w-8 h-8 cursor-pointer lg:hidden`}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
