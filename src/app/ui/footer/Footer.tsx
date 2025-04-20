import { FaFacebookF, FaXTwitter, FaInstagram, FaGoogle } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold">LUCKY SALON</h2>
          <div className="flex space-x-4 mt-3 justify-center md:justify-start">
            <a href="#" className="text-white hover:text-gray-400  bg-sky-700 rounded-md p-1">
              <FaFacebookF className="text-xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-400 bg-sky-700 rounded-md p-1">
              <FaXTwitter className="text-xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-400 bg-sky-700 rounded-md p-1">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-400 bg-sky-700 rounded-md p-1">
              <FaGoogle className="text-xl" />
            </a>
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            Your content goes here. Edit or remove this text inline or in the module Content settings.
          </p>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">

          <div className="bg-gray-900 p-5 rounded-2xl shadow-lg flex flex-col items-center w-56">
            <FaPhoneAlt className="text-white text-2xl mb-2" />
            <h3 className="font-semibold text-white">Contact Us</h3>
            <p className="text-gray-400 text-sm mt-1">+1 813-644-6006</p>
          </div>

          <div className="bg-gray-900 p-5 rounded-2xl shadow-lg flex flex-col items-center w-56">
            <FaEnvelope className="text-white text-2xl mb-2" />
            <h3 className="font-semibold text-white">Email Us</h3>
            <p className="text-gray-400 text-sm mt-1">test@gmail.com</p>
          </div>
        </div>
      </div>
    
      <div className="mt-8 text-center text-gray-400 text-sm border-t-2">
        Copyright© 2025 MakeItViral Media. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
