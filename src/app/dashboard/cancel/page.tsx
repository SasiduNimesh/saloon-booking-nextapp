'use client';
import { useRouter } from 'next/navigation';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function CancelPage() {
  const router = useRouter();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url('/images/tools3.avif')" }}
    >
      <div className="bg-white text-center p-6 rounded-lg shadow-xl max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-3">Payment Canceled</h1>
        <span className='text-xl text-red-600 mb-2 flex items-center justify-center'><AiFillCloseCircle /></span>
        <p className="text-gray-700 mb-5">
          Your payment was not completed. If you wish to try again, please return to the booking page.
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

