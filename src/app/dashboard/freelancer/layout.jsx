"use client";

import { useState } from "react";
import Link from "next/link";

export default function FreelancerLayout({ children }) {
  // মোবাইলে সাইডবার ওপেন/ক্লোজ করার স্টেট
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row relative">
      
      {/* 📱 মোবাইলের জন্য টপ বার ও মেনু বাটন (শুধুমাত্র ছোট স্ক্রিনে দেখাবে) */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow-sm border-b sticky top-0 z-50">
        <Link href="/">
          <h2 className="text-2xl font-bold text-orange-500">SkillSwap</h2>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-800 text-2xl"
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* 🗂️ আপনার আগের সেই হুবহু সাইডবার (এখন মোবাইলে রেসপন্সিভ ড্রয়ার) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-72 min-h-screen border-r bg-white shadow-sm transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen sticky md:top-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      > 
        <div className="border-b p-6"> 
          <Link href="/">
            <h2 className="cursor-pointer text-3xl font-bold text-orange-500 hover:text-orange-600 transition">
              SkillSwap
            </h2>
          </Link>

          <p className="mt-2 text-slate-500">
            Freelancer Dashboard
          </p>
        </div>

        <nav className="space-y-3 p-4">
          <Link
            href="/dashboard/freelancer"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 text-black hover:bg-orange-100"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/freelancer/tasks"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 text-black hover:bg-orange-100"
          >
            Available Tasks
          </Link>

          <Link
            href="/dashboard/freelancer/proposals"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 text-black hover:bg-orange-100"
          >
            My Proposals
          </Link>

          <Link
            href="/dashboard/freelancer/projects"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 text-black hover:bg-orange-100"
          >
            Active Projects
          </Link>

          <Link
            href="/dashboard/freelancer/accepted"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 text-black hover:bg-orange-100"
          >
            Accepted Jobs
          </Link>

          <Link
            href="/dashboard/freelancer/earnings"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 text-black hover:bg-orange-100"
          >
            My Earnings
          </Link>

          <Link
            href="/dashboard/freelancer/profile"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 text-black hover:bg-orange-100"
          >
            Edit Profile
          </Link>

          <Link
            href="/dashboard/freelancer/profile"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 text-black hover:bg-orange-100"
          >
            Profile
          </Link>
        </nav>
      </aside>

      {/* Overlay: মোবাইলে মেনু খুললে ব্যাকগ্রাউন্ড হালকা কালো করার জন্য */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        ></div>
      )}

      {/* 💻 মেইন কন্টেন্ট এরিয়া (মোবাইলে কন্টেন্ট চেপে যাবে না) */}
      <main className="flex-1 p-4 sm:p-8 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}