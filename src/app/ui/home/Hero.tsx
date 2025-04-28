'use client'
import Image from "next/image";
import Link from "next/link";
import './style.css'
import { GiBeard } from "react-icons/gi";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Hero = () => {

  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      once: false, 
      easing: "ease-out", // Ease animation
      mirror: true,
    });
    AOS.refresh();
  }, []);
  
  return (
    <div className="relative w-full h-screen bg-gray-950">
      
      <div className="absolute inset-0">
        <Image
          src="/images/homeImg1.webp" 
          alt="Lucky Barber"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-75 rounded-b-[30%]"
        />
      </div>

      
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-6 animate-fadeInDown">
        
        <p className="text-gray-300 uppercase tracking-wide text-lg" data-aos="fade-right">
          Fresh Since 2000
        </p>

        <h1 className="text-5xl md:text-5xl font-bold uppercase mt-4 diplomata-sc-regular" data-aos="fade-left">
         Lucky Salon
        </h1>

        <div className="flex items-center space-x-4 mt-4" data-aos="fade-right">
          <div className="w-50 border-t border-dashed border-white"></div>
          <GiBeard size={75} />
          <div className="w-50 border-t border-dashed border-white"></div>
        </div>

        <Link
          href="/book"
          data-aos="fade-left"
          className="mt-6 px-6 py-3 border border-white text-white uppercase font-semibold tracking-wide transition duration-300 hover:bg-white hover:text-black"
        >
          Book A Chair
        </Link>
      </div>
    </div>
  );
};

export default Hero;
