import React, { useState } from "react";

export default function AdminLogin({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-[350px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Admin Login</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-red-500 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-red-500 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
