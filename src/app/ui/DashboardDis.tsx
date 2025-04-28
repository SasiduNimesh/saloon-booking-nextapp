"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa';

interface Notice {
  nid: number;
  message: string;
}

const DashboardDis = () => {
  const [serviceCount, setServiceCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [newNotice, setNewNotice] = useState<string>("");

  const { data: session, status } = useSession();
  const isOwner = status === "authenticated" && session?.user?.role === "owner";
    
  const fetchServiceCount = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/serviceCount');
      const data = await response.json();
      const total = (data.hairCount || 0) + (data.beautyCount || 0);
      setServiceCount(total);
    } catch (error) {
      console.error('Failed to fetch service count:', error);
    }
  }

  const fetchCustomerCount = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/customerCount')
      const data = await response.json()
      setCustomerCount(data.customerCount || 0)
    } catch (error) {
      console.error('Failed to fetch customer count:', error)
    }
  }

  const fetchBookingCount = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/bookingCount');
      const data = await response.json();
      setBookingCount(data.bookingCount || 0);
    } catch (error) {
      console.error('Failed to fetch booking count:', error);
    }
  }

  const fetchNotices = async () => {
    try {
      const response = await fetch('/api/notices');
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    }
  };

  const handleAddNotice = async () => {
    if (newNotice.trim()) {
      try {
        const res = await fetch('/api/notices', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: newNotice })
        });
        if (res.ok) {
          setNewNotice("");
          fetchNotices(); 
        }
      } catch (error) {
        console.error('Failed to add notice:', error);
      }
    }
  };
  
  const handleDeleteNotice = async (nid: number) => {
    try {
      const res = await fetch(`/api/notices/${nid}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // No need to do res.json()
        fetchNotices(); // Just refresh notices
      } else {
        console.error('Failed to delete notice:', await res.text()); // Optional: show error text
      }
    } catch (error) {
      console.error('Failed to delete notice:', error);
    }
  };
  


  useEffect(() => {
    fetchServiceCount();
    fetchCustomerCount();
    fetchBookingCount();
    fetchNotices();
  },[]);

  const sumaries = [
    { title: 'Available Services', value: serviceCount },
    { title: 'Total Bookings', value: bookingCount },
    { title: 'Registered Customers', value: customerCount },
  ]

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sumaries.map((sumary, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-amber-900"
          >
            <div className="text-lg text-center font-semibold text-white bg-amber-900 rounded-t-md px-3 py-2 mb-3">
              {sumary.title}
            </div>
            <div className="text-center text-3xl font-bold text-amber-900">
              {sumary.value}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Notices</h3>

        {isOwner && (
          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={newNotice}
              onChange={(e) => setNewNotice(e.target.value)}
              placeholder="Enter new notice..."
              className="flex-1 border border-yellow-500 p-2 rounded"
            />
            <button
              onClick={handleAddNotice}
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 cursor-pointer"
            >
              Add
            </button>
          </div>
        )}

        <ul className="text-sm space-y-2 pl-2">
          {notices.map((notice) => (
            <li key={notice.nid} className="flex justify-between m-2">
              <span className='flex items-center gap-2'><FaPen />{notice.message}</span>
              {isOwner && (
                <button
                  onClick={() => handleDeleteNotice(notice.nid)}
                  className="text-red-600 hover:text-red-800 text-xs ml-4 hover:underline cursor-pointer items-end"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DashboardDis