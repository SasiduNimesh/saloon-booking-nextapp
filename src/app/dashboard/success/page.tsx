'use client';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url('/images/tools3.avif')" }}
    >
      <div className="bg-white text-center p-6 rounded-lg shadow-xl max-w-md">
        <h1 className="text-2xl font-bold text-green-700 mb-3 ">Payment Successfull !!</h1>
        <span className='text-xl text-green-700 mb-2 flex items-center justify-center'><FaCheckCircle /></span>
        <p className="text-gray-700 mb-5">
          Thank you! You Payment Received.
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

