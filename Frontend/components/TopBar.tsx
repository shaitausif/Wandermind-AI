'use client'

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { requestHandler } from "@/utils";
import { logoutUser } from "@/lib/apiClient";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function TopBar() {

  const { user , setUser, clearUser } = useAuth()
  const toast = useToast()
  const router = useRouter()


  return (
    <header className="backdrop-blur-lg bg-white/10 text-white py-4 shadow-md sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto flex justify-between items-center px-6">

        {/* Travel-themed Icon + Title */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          {/* Globe Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c0 4 3 8 8 8m-8-8c-4 0-8 3-8 8m8-8v16"
            />
          </svg>
          <h2 className="text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition-colors duration-300">
            TravelPlanner
          </h2>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-8 text-lg font-medium">
          {/* Home */}
          <Link
            href="/"
            className="relative group flex items-center gap-2 transition-colors duration-300 hover:text-yellow-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9.5l9-7 9 7V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
            </svg>
            Home
          </Link>

          {/* Profile */}
          {
            user && (
              <Link
            href="/profile"
            className="relative group flex items-center gap-2 transition-colors duration-300 hover:text-yellow-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
            Profile
          </Link>
            )
          }

          {/* Reviews */}
          <Link
            href="/reviews"
            className="relative group flex items-center gap-2 transition-colors duration-300 hover:text-yellow-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V6h2v6z" />
            </svg>
            Reviews
          </Link>

          {/* Login */}
          {
            user ? (
               
            <>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 17l5-5-5-5v10zM4 4h2v16H4V4z" />
            </svg>
            <button onClick={() => {
              requestHandler(
                async() => await logoutUser(),
                null,
                (res) => {
                  clearUser()
                  router.push('/login')
                },
              (err) => {
                // @ts-ignore
                toast.showToast(err.message,'error')
              }
              )
            }}>Logout</button>
          
            </>
            ) : (
              <Link
            href="/login"
            className="relative group flex items-center gap-2 transition-colors duration-300 hover:text-yellow-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 17l5-5-5-5v10zM4 4h2v16H4V4z" />
            </svg>
            Login
          </Link>
            )
          }
        </nav>
      </div>
    </header>
  );
}
