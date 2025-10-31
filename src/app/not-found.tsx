"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2b2b2b] text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[10rem] font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-xl text-gray-300 mb-8"
      >
        Oops... The page you’re looking for doesn’t exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          href="/"
          className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-700 hover:to-gray-500 px-6 py-3 rounded-full font-medium text-gray-100 shadow-lg shadow-black/30 transition-all duration-300 hover:scale-105"
        >
          <FaArrowLeft />
          Back to Home
        </Link>
      </motion.div>

      {/* <div className="absolute bottom-10 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-gray-500/10 to-gray-100/10 blur-3xl" /> */}
    </div>
  );
}
