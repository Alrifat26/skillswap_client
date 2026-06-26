"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      title: "Overview",
      href: "/dashboard/admin",
      icon: "📊",
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: "👥",
    },
    {
      title: "Tasks",
      href: "/dashboard/admin/tasks",
      icon: "📋",
    },
    {
      title: "Payments",
      href: "/dashboard/admin/payments",
      icon: "💳",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row relative text-black">
      
      
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
        className={`fixed inset-y-0 left-0 z-40 w-64 min-h-screen bg-white border-r shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen sticky md:top-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      > 
        <div className="border-b p-6">
          <Link href="/">
            <h1 className="cursor-pointer text-3xl font-bold text-orange-500 hover:text-orange-600 transition">
              SkillSwap
            </h1>
          </Link>
          <p className="mt-1 text-sm text-slate-500">
            Admin Panel
          </p>
        </div>

        <nav className="space-y-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)} // মোবাইলে ক্লিক করলে মেনু বন্ধ হবে
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                pathname === item.href
                  ? "bg-orange-100 font-semibold text-orange-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className="text-xl">
                {item.icon}
              </span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>

      
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        ></div>
      )}

     
      <main className="flex-1 p-4 sm:p-6 min-w-0 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}