'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TopBar from "../../../components/TopBar";
import Footer from "../../../components/Footer";
import axios from "axios";
import { requestHandler } from "@/utils";
import { loginUser } from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

const LoginPage: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth()
  const { showToast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async () => {
    requestHandler(
      async() => await loginUser({ identifier : emailInput, password : passwordInput}),
      setLoading,
      (res) => {
       
        if(res.statusCode == 404){
          setLoginError(res.message)
        }
        setUser(res.data)
        router.push('/')
        console.log(res.message)
      },
      (err) => {
        // @ts-ignore
        if(err?.statusCode == 404){
          // @ts-ignore
          setLoginError(err.message)
        }
        // @ts-ignore
        showToast(err.message)
      }
    )
  };

  return (
    <div className="auth-page min-h-screen flex flex-col relative overflow-x-hidden">
      <TopBar />

      {}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 50%, #9333EA 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {}
      {mounted && (
        <motion.div
          className="absolute w-full h-full -z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(10)].map((_, idx) => (
            <div
              key={idx}
              className="absolute w-4 h-4 bg-yellow-300 rounded-full opacity-50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>
      )}

      <div className="flex flex-1 items-center justify-center px-4 z-10 relative">
        <motion.div
          className="auth-container bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
            Login
          </h2>

          <form action="">
            <input
            type="email"
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <button
          type="submit"
            onClick={handleLogin}
            disabled={loading}
            className={`w-full p-3 rounded-xl text-white font-semibold transition 
              ${loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          </form>

          {loginError && (
            <p className="text-red-500 text-center mt-4">{loginError}</p>
          )}

          <p className="mt-6 text-center text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-600 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
