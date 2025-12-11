'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "../../../components/TopBar";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import axios from "axios";
import { requestHandler } from "@/utils";
import { registerUser } from "@/lib/apiClient";
import { useToast } from "@/context/ToastContext";

interface Dot {
  top: number;
  left: number;
}

const SignupPage: React.FC = () => {
  const [nameInput, setNameInput] = useState<string>("");
  const [usernameInput, setusernameInput] = useState("")
  const [emailInput, setEmailInput] = useState<string>("");

  const [passwordInput, setPasswordInput] = useState<string>("");
  const [signupError, setSignupError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dots, setDots] = useState<Dot[]>([]);
  const router = useRouter();

  useEffect(() => {
    const generatedDots: Dot[] = Array.from({ length: 10 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setDots(generatedDots);
  }, []);

  const { showToast } = useToast();

  const handleSignup = async () => {
   requestHandler(
    // @ts-ignore 
    async() => await registerUser({fullName : nameInput, username : usernameInput, email : emailInput, password : passwordInput}),
    setLoading,
    (res) => {
      console.log(res.message)
      router.push('/login')
    },
    (err) => {
      // @ts-ignore
      showToast(err.message,'error')
      // @ts-ignore
      if(err.statusCode == 404){
        // @ts-ignore
        setSignupError(err.message)
      }

    }
   )
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <TopBar />

      {}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 50%, #9333EA 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {}
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {dots.map((dot, idx) => (
          <div
            key={idx}
            className="absolute w-4 h-4 bg-pink-300 rounded-full opacity-50"
            style={{
              top: `${dot.top}%`,
              left: `${dot.left}%`,
            }}
          />
        ))}
      </motion.div>

      {}
      <div className="flex flex-1 items-center justify-center px-4 z-10 relative">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full animate-fadeInUp">
          <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center animate-fadeInUp">
            Signup
          </h2>

          <form action="">
            <input
            type="text"
            placeholder="Enter Full Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition animate-fadeInUp"
          />

          <input
            type="text"
            placeholder="Enter username"
            value={usernameInput}
            onChange={(e) => setusernameInput(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition animate-fadeInUp"
          />

          <input
            type="email"
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition animate-fadeInUp delay-100"
          />

          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition animate-fadeInUp delay-200"
          />

          <button
          type="submit"
            onClick={handleSignup}
            disabled={loading}
            className={`w-full p-3 rounded-xl text-white font-semibold transition 
              ${loading ? "bg-pink-300 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 animate-pulseButton"}`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
          </form>

          {signupError && (
            <p className="text-red-500 text-center mt-4 animate-fadeInUp delay-300">{signupError}</p>
          )}

          <p className="mt-6 text-center text-gray-500 animate-fadeInUp delay-400">
            Already have an account?{" "}
            <a href="/login" className="text-pink-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;
