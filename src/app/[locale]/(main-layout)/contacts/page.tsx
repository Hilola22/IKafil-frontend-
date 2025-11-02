"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const BOT_TOKEN = "BOT_TOKEN_HERE"; 
  const CHAT_ID = "CHAT_ID_HERE"; 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const text = `
📩 *Yangi xabar keldi!*
👤 Ism: ${form.name}
📧 Email: ${form.email}
💬 Xabar: ${form.message}
`;

    try {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown",
      });

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Xabar yuborishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-blue-600 text-xl" />
              <div>
                <h3 className="font-medium text-gray-700">Phone</h3>
                <p className="text-gray-600">+998901234567</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-600 text-xl" />
              <div>
                <h3 className="font-medium text-gray-700">Email</h3>
                <p className="text-gray-600">ikafilsupport@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
              <div>
                <h3 className="font-medium text-gray-700">Address</h3>
                <p className="text-gray-600">
                  Tashkent, Uzbekistan
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Write your message"
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-green-600 text-center font-medium">
                ✅ Xabaringiz yuborildi!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
