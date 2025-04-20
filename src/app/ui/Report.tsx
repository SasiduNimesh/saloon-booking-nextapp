"use client";
import React, { useEffect, useState } from "react";

const Report = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeView, setActiveView] = useState<number | null>(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/bookings");
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="mx-auto p-6 space-y-4">
      <div className="overflow-x-auto max-h-[60vh]">
        <table className="min-w-full bg-gray-300 border border-gray-300 shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Booking No</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Date & Time</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.bookingId} className="border-b text-center">
                <td className="py-2 px-4 border font-semibold">BID{b.bookingId}</td>
                <td className="py-2 px-4 border">{b.cname}</td>
                <td className="py-2 px-4 border">
                  {`${new Date(b.app_date).toISOString().split("T")[0]} ${b.app_time.substring(0, 8)}`}
                </td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() =>
                      setActiveView(b.bookingId === activeView ? null : b.bookingId)
                    }
                  >
                    {activeView === b.bookingId ? "Hide" : "View"}
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={async () => {
                      const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
                      if (!confirmCancel) return;

                      try {
                        const res = await fetch(`http://localhost:3000/api/bookings/${b.bookingId}`, {
                          method: "DELETE",
                        });
                        if (res.ok) {
                          alert("Booking canceled successfully");
                          fetchBookings(); // Refresh the list
                        } else {
                          alert("Failed to cancel booking");
                        }
                      } catch (err) {
                        console.error("Cancel error:", err);
                        alert("Error occurred while canceling");
                      }
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.map(
        (b) =>
          activeView === b.bookingId && (
            <div
              key={`card-${b.bookingId}`}
              className="absolute bg-white border border-sky-200 p-3 rounded-md shadow-md text-justify right-80 -bottom-3"
            >
              <h3 className="text-md font-semibold text-sky-800 mb-2">Booking Details</h3>
              <div className="space-y-1">
                <p><strong>Booking ID:</strong> BID{b.bookingId}</p>
                <p><strong>Name:</strong> {b.cname}</p>
                <p><strong>Email:</strong> {b.cemail}</p>
                <p><strong>Mobile:</strong> {b.mobileno}</p>
                <p><strong>Service:</strong> {b.service_name}</p>
                <p><strong>Price:</strong> ${b.price}</p>
                <p><strong>Payment Method:</strong> {b.pay_method}</p>
                <p>
                  <strong>Date & Time:</strong>{" "}
                  {`${new Date(b.app_date).toISOString().split("T")[0]} ${b.app_time.substring(0, 8)}`}
                </p>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Report;
