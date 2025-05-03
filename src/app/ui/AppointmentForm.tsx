"use client";
import React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from "next/navigation";

interface Service {
  name: string;
  price: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const AppointmentForm = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dateTime: null as Date | null,
    serviceName: "",
    price: "",
    paymentMethod: "",
  });

  const [services, setServices] = useState<Service[]>([]);
  
  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/bookService");
      const { services } = await response.json();
      setServices(services);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };
  
  const fetchBlockedTimes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/bookMaxTimes");
      const { bookedTimes } = await res.json();
      const times: string[] = bookedTimes;
  
      const parsed = times.map((t) => new Date(t));
      setFullyBookedTimes(parsed);
    } catch (error) {
      console.error("Failed to fetch fully booked times:", error);
    }
  };
  
  useEffect(() => {
    fetchServices();
    fetchBlockedTimes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "serviceName" && value === "" ? { price: "0" } : {}),
    });

    if (name === "serviceName" && value !== "") {
      const selectedService = services.find((service) => service.name === value);
      if (selectedService) {
        setFormData((prevData) => ({
          ...prevData,
          price: selectedService.price,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dateObj = formData.dateTime!;
    const date = dateObj.toISOString().split('T')[0];
    const time = dateObj.toTimeString().substring(0, 5);

    if (formData.paymentMethod === 'Cash') {
      try {
        const res = await fetch('http://localhost:3000/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cname: formData.name,
            cemail: formData.email,
            mobileno: formData.mobile,
            service_name: formData.serviceName,
            price: formData.price,
            app_date: date,
            app_time: time,
            pay_method: 'Cash',
            pay_status: 'Payment by Cash',
          }),
        });

        const data = await res.json();
        if (res.ok) {
          await fetch('/api/sendConform', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              service: formData.serviceName,
              date,
              time,
            }),
          });
        
          alert('Appointment booked successfully (Cash). A confirmation email has been sent.');
        
          setFormData({
            name: "",
            email: "",
            mobile: "",
            dateTime: null,
            serviceName: "",
            price: "",
            paymentMethod: "",
          });
          setStep(1);
        } else {
          alert('Failed to book appointment.');
        }
        
      } catch (err) {
        console.error('Booking error:', err);
      }
    } 
    
    else if (formData.paymentMethod === 'Card') {
      try {
        const stripe = await stripePromise;
        const res = await fetch('http://localhost:3000/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            date: date,
            time: time.substring(0, 5),
          }),
        });

        const session = await res.json();
        const result = await stripe?.redirectToCheckout({ sessionId: session.id });

        if (result?.error) {
          console.error(result.error.message);
        }
      } catch (err) {
        console.error('Stripe error:', err);
      }
    }

  };

  const [fullyBookedTimes, setFullyBookedTimes] = useState<Date[]>([]);

  // Time filtering by salon open hours
  const filterTime = (time: Date) => {
    const day = time.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const total = hour * 60 + minutes;
  
    if (day >= 1 && day <= 5) return total >= 420 && total <= 1320; // Mon–Fri: 7AM–10PM
    if (day === 6) return total >= 480 && total <= 1320;            // Sat: 8AM–10PM
    if (day === 0) return total >= 480 && total <= 1380;            // Sun: 8AM–11PM
    return false;
  };

  return (
    <div className="flex flex-col p-4 bg-gradient-to-r from-gray-800 to-sky-800 shadow-2xl rounded-md">
      <h2 className="text-2xl font-bold mb-2 text-white">Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Personal Details<hr /></h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-white">Full Name :</label>
                <input
                  className="border bg-white/10 border-white/30 p-2 w-full mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  name="name"
                  onChange={handleChange}
                  required
                />

                <label className="block mb-1 text-white">Mobile Number :</label>
                <input
                  className="border bg-white/10 border-white/30 p-2 w-full mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  name="mobile"
                  type="tel"
                  onChange={handleChange}
                  required
                />

                <label className="block mb-1 text-white">Select Service :</label>
                <select
                  className="bg-white/10 border-white/30 border w-full p-2 mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  name="serviceName"
                  onChange={handleChange}
                  required
                >
                  <option value="" className="text-black font-semibold">------ Select ------</option>
                  {services.map((service) => (
                    <option key={service.name} value={service.name} className="text-black font-semibold">
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-white">Email :</label>
                <input
                  className="border bg-white/10 border-white/30 p-2 w-full mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  required
                />

                <label className="block mb-1 text-white">Date & Time :</label>
                <div className="relative">
                  <DatePicker
                    selected={formData.dateTime ? new Date(formData.dateTime) : null}
                    onChange={(date: Date | null) => {
                      if (date) {
                        setFormData({ ...formData, dateTime: date }); // store Date object directly
                      }
                    }}
                    showTimeSelect
                    timeIntervals={120}
                    dateFormat="yyyy-MM-dd ||  h:mm aa"
                    minDate={new Date()}
                    excludeTimes={fullyBookedTimes}
                    filterTime={filterTime}
                    className="bg-white/10 border-white/30 p-2 mb-2 border text-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    calendarClassName="!z-50"
                    placeholderText="select date & time..."
                  />
                </div>

                <label className="block mb-1 text-white">Price ($) :</label>
                <input
                  className="border bg-white/10 border-white/30 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  name="price"
                  value={formData.price}
                  readOnly
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block mb-1 text-white">Payment Method :</label>
            <select
              className="border p-2 w-full mb-2 text-white bg-gray-700"
              name="paymentMethod"
              onChange={handleChange}
              required
            >
              <option value="" className="text-black font-semibold">Select ...</option>
              <option value="Card" className="text-black font-semibold">Card</option>
              <option value="Cash" className="text-black font-semibold">Cash</option>
            </select>
          </div>
        )}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Back
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="bg-sky-500 text-white font-bold px-4 py-2 rounded-md hover:bg-purple-800 cursor-pointer w-1/2 shadow-2xl"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Book Appointment
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
