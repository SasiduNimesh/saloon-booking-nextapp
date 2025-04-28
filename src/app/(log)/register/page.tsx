"use client"
import { useState } from 'react'
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, rePassword, role }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      alert("Registration successful!");
      window.location.href = "/login";
    } else {
      alert(data.error || "Registration failed");
    }

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cover" style={{ backgroundImage: "url('/images/homeImg1.webp')"}}>
      <div className="bg-black opacity-75 rounded-xl shadow-2xl w-[90%] max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-sky-700">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-400 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-400 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Comform Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-400 text-white"
              value={rePassword}
              onChange={(e) => setRepassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="hidden text-sm font-medium text-gray-300 mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="hidden w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 text-white bg-amber-950 "
            >
              <option value="customer">Customer</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-800 text-white py-2 rounded-md transition duration-200 cursor-pointer"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-700">
            Do you have an account?{" "}
            <Link href="/login" className="text-red-700 font-bold hover:underline">
            Login
            </Link>
        </div>
      </div>
    </div>
  )
};