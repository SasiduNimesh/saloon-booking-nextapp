'use client';

import React from 'react';
import { useRef } from 'react'

const BookContact = () => {

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(form.current!);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      alert("Message sent!");
      form.current?.reset();
    } else {
      alert("Failed to send message");
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-200 to-violet-200 py-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <p className="text-lg text-yellow-800 font-extrabold uppercase tracking-wide border-b-2">Contact</p>
          <h2 className="text-3xl font-bold text-gray-800">Send a Message</h2>
        </div>

        <form className="space-y-4" ref={form} onSubmit={sendEmail}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name='name'
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              name='email'
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <textarea
            name='message'
            placeholder="Message"
            rows={4}
            className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition-all ease-in-out cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-12 text-center grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className='bg-gray-200 rounded-lg p-2 shadow-sky-900 shadow-lg'>
          <h3 className="text-lg font-semibold text-gray-800">Visit Us</h3>
          <p className="text-gray-600">13801 N Florida Ave, Suit C, Tampa, FL,<br /> United States, Florida</p>
        </div>
        <div className='bg-gray-200 rounded-lg p-2 shadow-sky-900 shadow-lg'>
          <h3 className="text-lg font-semibold text-gray-800">Get In Touch</h3>
          <p className="text-gray-600">+1 813-644-6006<br />info@makeitviralmedia.com</p>
        </div>
        <div className='bg-gray-200 rounded-lg p-2 shadow-sky-900 shadow-lg'>
          <h3 className="text-lg font-semibold text-gray-800">Open Hours</h3>
          <p className="text-gray-600">
            Monday - Friday: 2 pm - 10pm<br />
            Saturday - Sunday: 10am - 10pm
          </p>
        </div>
      </div>
    </div>
  )
}

export default BookContact