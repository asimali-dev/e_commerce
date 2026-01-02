import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup({ setToken, setUserEmail }) { // ✅ added setUserEmail
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(
        "http://localhost:8080/Ecommerce_backend/sign_up.php",
        new URLSearchParams({ name, email, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const data = res.data;

      if (data.status === "success") {
        setSuccess(data.message);
        setName("");
        setEmail("");
        setPassword("");
        setToken(email);
        setUserEmail(email); // ✅ added this line
        localStorage.setItem("token", email);
        localStorage.setItem("userEmail", email); // ✅ added this line
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error!");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-96 border-2 border-red-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
