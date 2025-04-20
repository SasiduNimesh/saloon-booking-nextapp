"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
//import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/"); 
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cover" style={{ backgroundImage: "url('/images/homeImg1.webp')"}}>
      <div className="bg-black opacity-75 rounded-xl shadow-lg w-[90%] max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-sky-700">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button type="submit" className="w-full bg-sky-600 hover:bg-sky-800 text-white py-2 rounded-md cursor-pointer">
            Login
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-400">
          Don't you have an account?{" "}
          <Link href="/register" className="text-red-700 hover:underline text-bold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
