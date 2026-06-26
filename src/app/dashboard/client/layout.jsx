"use client";

import { useState } from "react";
import Link from "next/link";

export default function ClientDashboardLayout({ children }) {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row relative">
      
      
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow-sm border-b sticky top-0 z-50">
        <Link href="/">
          <h2 className="text-2xl font-bold text-orange-500">SkillSwap</h2>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-800 text-2xl focus:outline-none"
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-72 min-h-screen bg-white border-r shadow-sm transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen sticky md:top-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      > 
        <div className="p-6 border-b">
          <Link href="/">
            <h2 className="cursor-pointer text-3xl font-bold text-orange-500 hover:text-orange-600 transition">
              SkillSwap
            </h2>
          </Link>

          <p className="text-slate-500 mt-2">
            Client Dashboard
          </p>
        </div>

        <nav className="p-4 space-y-3">
          <Link
            href="/dashboard/client"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 hover:bg-orange-100 text-black"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/client/post-task"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 hover:bg-orange-100 text-black"
          >
            Post Task
          </Link>

          <Link
            href="/dashboard/client/tasks"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 hover:bg-orange-100 text-black"
          >
            My Tasks
          </Link>

          <Link
            href="/dashboard/client/proposals"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 hover:bg-orange-100 text-black"
          >
            Proposals
          </Link>

          <Link
            href="/dashboard/client/reviews"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 text-black hover:bg-orange-100"
          >
            Reviews ⭐
          </Link>

          <Link
            href="/dashboard/client/completed-tasks"
            onClick={() => setIsSidebarOpen(false)}
            className="block rounded-xl px-4 py-3 text-black hover:bg-orange-100"
          >
            Completed Tasks
          </Link>
        </nav>
      </aside>

     
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        ></div>
      )}

      
      <main className="flex-1 p-4 sm:p-8 min-w-0 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}